from flask import Blueprint, request, jsonify
from extensions import db
from models import CannedResponse

bp = Blueprint('canned_responses', __name__)


@bp.route('/cannedResponses', methods=['GET'])
def get_canned_responses():
    try:
        responses = CannedResponse.query.order_by(CannedResponse.created_at.desc()).all()
        return jsonify([response.to_dict() for response in responses]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@bp.route('/cannedResponses', methods=['POST'])
def create_canned_response():
    try:
        response_text = request.get_json()
        
        if not response_text or not isinstance(response_text, str):
            return jsonify({'error': 'Response text is required'}), 400
        
        new_response = CannedResponse(response=response_text)
        
        db.session.add(new_response)
        db.session.commit()
        
        return jsonify(new_response.to_dict()), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@bp.route('/cannedResponses/<response_id>', methods=['PUT'])
def update_canned_response(response_id):
    try:
        canned_response = CannedResponse.query.get(response_id)
        if not canned_response:
            return jsonify({'error': 'Canned response not found'}), 404
        
        data = request.get_json()
        
        if 'response' in data:
            canned_response.response = data['response']
        
        db.session.commit()
        return jsonify(canned_response.to_dict()), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@bp.route('/cannedResponses/<response_id>', methods=['DELETE'])
def delete_canned_response(response_id):
    try:
        canned_response = CannedResponse.query.get(response_id)
        if not canned_response:
            return jsonify({'error': 'Canned response not found'}), 404
        
        db.session.delete(canned_response)
        db.session.commit()
        
        return '', 204
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
