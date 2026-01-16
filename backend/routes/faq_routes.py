from flask import Blueprint, request, jsonify
from extensions import db
from models import FAQAutoResponse

bp = Blueprint('faq', __name__)


@bp.route('/faqAutoResponse', methods=['GET'])
def get_faq_auto_response():
    try:
        # Get the first (and should be only) FAQ auto response
        faq = FAQAutoResponse.query.first()

        # Return just the string as per the service interface
        return jsonify(faq.faq_auto_response), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@bp.route('/faqAutoResponse/<faq_id>', methods=['PUT'])
def update_faq_auto_response(faq_id):
    try:
        faq = FAQAutoResponse.query.get(faq_id)
        if not faq:
            return jsonify({'error': 'FAQ auto response not found'}), 404
        
        data = request.get_json()
        
        if 'faqAutoResponse' in data:
            faq.faq_auto_response = data['faqAutoResponse']
        
        db.session.commit()
        return jsonify(faq.to_dict()), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
