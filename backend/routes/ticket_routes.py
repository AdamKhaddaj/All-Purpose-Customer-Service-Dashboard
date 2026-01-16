from flask import Blueprint, request, jsonify
from extensions import db
from models import Ticket, Message, Tag, Agent
from datetime import datetime
import json

bp = Blueprint('tickets', __name__)


@bp.route('/tickets', methods=['GET'])
def get_tickets():
    try:
        # Start with base query
        query = Ticket.query
        
        # Apply filters
        search = request.args.get('search', '').strip()
        if search:
            # Search in customer name, marketplace conversation ID
            query = query.filter(
                db.or_(
                    Ticket.customer_name.ilike(f'%{search}%'),
                    Ticket.marketplace_conversation_id.ilike(f'%{search}%')
                )
            )
        
        ticket_status = request.args.get('ticketStatus')
        if ticket_status:
            query = query.filter(Ticket.ticket_status == ticket_status)
        
        priority = request.args.get('priority')
        if priority:
            query = query.filter(Ticket.priority == priority)
        
        assigned_to = request.args.get('assignedTo')
        if assigned_to:
            # get the agent id
            agent = Agent.query.filter_by(name=assigned_to).first()
            if agent:
                query = query.filter(Ticket.assigned_to == agent.id)
        
        tags_param = request.args.get('tags')
        if tags_param:
            try:
                tag_list = json.loads(tags_param)
                if tag_list and len(tag_list) > 0:
                    # Filter tickets that have ANY of the specified tags
                    tag_ids = [tag.get('ID') for tag in tag_list if tag.get('ID')]
                    if tag_ids:
                        query = query.join(Ticket.tags).filter(Tag.id.in_(tag_ids))
            except json.JSONDecodeError:
                pass
        
        start_date = request.args.get('startDate')
        if start_date:
            try:
                start = datetime.fromisoformat(start_date.replace('Z', '+00:00'))
                query = query.filter(Ticket.conversation_start_date >= start)
            except ValueError:
                pass
        
        end_date = request.args.get('endDate')
        if end_date:
            try:
                end = datetime.fromisoformat(end_date.replace('Z', '+00:00'))
                query = query.filter(Ticket.conversation_start_date <= end)
            except ValueError:
                pass
        
        # Execute query and return results
        tickets = query.order_by(Ticket.last_updated_date.desc()).all()
        return jsonify([ticket.to_dict() for ticket in tickets]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@bp.route('/tickets/<ticket_id>', methods=['PUT'])
def update_ticket(ticket_id):
    try:
        ticket = Ticket.query.get(ticket_id)
        if not ticket:
            return jsonify({'error': 'Ticket not found'}), 404
        
        data = request.get_json()
        
        # Update simple fields
        if 'priority' in data:
            ticket.priority = data['priority']
        
        if 'ticketStatus' in data:
            ticket.ticket_status = data['ticketStatus']
        
        if 'assignedTo' in data:
            # Handle assignedTo - can be agent name or empty string
            if data['assignedTo']:
                agent = Agent.query.filter_by(name=data['assignedTo']).first()
                if agent:
                    ticket.assigned_to = agent.id
            else:
                ticket.assigned_to = None
        
        if 'relatedListingURL' in data:
            ticket.related_listing_url = data['relatedListingURL']
        
        # Update tags
        if 'tags' in data:
            # Clear existing tags and add new ones
            ticket.tags = []
            for tag_data in data['tags']:
                tag = Tag.query.get(tag_data['ID'])
                if tag:
                    ticket.tags.append(tag)
        
        
        db.session.commit()
        return jsonify(ticket.to_dict()), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@bp.route('/tickets/<ticket_id>/reply', methods=['PUT'])
def reply_to_ticket(ticket_id):
    # NOTE: this is what you'd connect to your external messaging API to send the reply
    try:
        ticket = Ticket.query.get(ticket_id)
        if not ticket:
            return jsonify({'error': 'Ticket not found'}), 404
        
        reply_text = request.get_json()
        
        if not reply_text or not isinstance(reply_text, str):
            return jsonify({'error': 'Reply message is required'}), 400
        
        # PLACEHOLDER: Here you would integrate with whatever API you're fetching customer info from
        
        # For now, we just add the message to our database
        new_message = Message(
            ticket_id=ticket_id,
            message=reply_text,
            authored=True,  # This is sent by the agent
            date=datetime.utcnow(),
            image_attachments=[]
        )
        
        db.session.add(new_message)
        ticket.last_updated_date = datetime.utcnow()
        
        # Optionally update ticket status to "In Progress" if it was "New"
        if ticket.ticket_status == 'New':
            ticket.ticket_status = 'In Progress'
        
        db.session.commit()
        
        return jsonify(ticket.to_dict()), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
