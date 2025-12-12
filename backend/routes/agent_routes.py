from flask import Blueprint, request, jsonify
from app import db
from models import Agent

bp = Blueprint('agents', __name__)


@bp.route('/agents', methods=['GET'])
def get_all_agents():
    try:
        agents = Agent.query.order_by(Agent.name).all()
        return jsonify([agent.to_dict() for agent in agents]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@bp.route('/agents', methods=['POST'])
def create_agent():
    try:
        agent_name = request.get_json()
        
        if not agent_name or not isinstance(agent_name, str):
            return jsonify({'error': 'Agent name is required'}), 400
        
        # Check if agent with same name already exists
        existing_agent = Agent.query.filter_by(name=agent_name).first()
        if existing_agent:
            return jsonify({'error': 'Agent with this name already exists'}), 409
        
        new_agent = Agent(name=agent_name)
        
        db.session.add(new_agent)
        db.session.commit()
        
        return jsonify(new_agent.to_dict()), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@bp.route('/agents/<agent_id>', methods=['PUT'])
def update_agent(agent_id):
    try:
        agent = Agent.query.get(agent_id)
        if not agent:
            return jsonify({'error': 'Agent not found'}), 404
        
        data = request.get_json()
        
        if 'name' in data:
            # Check if another agent with this name exists
            existing_agent = Agent.query.filter(Agent.name == data['name'], Agent.id != agent_id).first()
            if existing_agent:
                return jsonify({'error': 'Agent with this name already exists'}), 409
            agent.name = data['name']
        
        db.session.commit()
        return jsonify(agent.to_dict()), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@bp.route('/agents/<agent_id>', methods=['DELETE'])
def delete_agent(agent_id):
    try:
        agent = Agent.query.get(agent_id)
        if not agent:
            return jsonify({'error': 'Agent not found'}), 404
        
        # Unassign tickets from this agent
        for ticket in agent.tickets:
            ticket.assigned_to = None
        
        db.session.delete(agent)
        db.session.commit()
        
        return '', 204
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
