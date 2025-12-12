from flask import Blueprint, request, jsonify
from app import db
from models import Tag

bp = Blueprint('tags', __name__)


@bp.route('/tags', methods=['GET'])
def get_all_tags():
    try:
        tags = Tag.query.order_by(Tag.name).all()
        return jsonify([tag.to_dict() for tag in tags]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@bp.route('/tags', methods=['POST'])
def create_tag():
    try:
        data = request.get_json()
        
        if not data or 'name' not in data or 'color' not in data:
            return jsonify({'error': 'Name and color are required'}), 400
        
        # Check if tag with same name already exists
        existing_tag = Tag.query.filter_by(name=data['name']).first()
        if existing_tag:
            return jsonify({'error': 'Tag with this name already exists'}), 409
        
        new_tag = Tag(
            name=data['name'],
            color=data['color']
        )
        
        db.session.add(new_tag)
        db.session.commit()
        
        return jsonify(new_tag.to_dict()), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@bp.route('/tags/<tag_id>', methods=['PUT'])
def update_tag(tag_id):
    try:
        tag = Tag.query.get(tag_id)
        if not tag:
            return jsonify({'error': 'Tag not found'}), 404
        
        data = request.get_json()
        
        if 'name' in data:
            # Check if another tag with this name exists
            existing_tag = Tag.query.filter(Tag.name == data['name'], Tag.id != tag_id).first()
            if existing_tag:
                return jsonify({'error': 'Tag with this name already exists'}), 409
            tag.name = data['name']
        
        if 'color' in data:
            tag.color = data['color']
        
        db.session.commit()
        return jsonify(tag.to_dict()), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@bp.route('/tags/<tag_id>', methods=['DELETE'])
def delete_tag(tag_id):
    try:
        tag = Tag.query.get(tag_id)
        if not tag:
            return jsonify({'error': 'Tag not found'}), 404
        
        db.session.delete(tag)
        db.session.commit()
        
        return '', 204
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
