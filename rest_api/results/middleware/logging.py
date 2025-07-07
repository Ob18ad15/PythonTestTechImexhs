import logging

logger = logging.getLogger("api")

class APILogMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        logger.info(f"Solicitud: {request.method} {request.get_full_path()}")
        response = self.get_response(request)
        logger.info(f"Respuesta ({response.status_code}): {response.content[:250]}")
        return response