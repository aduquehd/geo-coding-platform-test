# Geopy
from geopy import distance as geopy_distance

# Django
from django.conf import settings

# Rest framework
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

# Utils
from geo_coding_platform_test.apps.geocoding.utils import GoogleGeocodeAPI


class GeoCodingViewSet(GenericViewSet):
    queryset = None

    def get_serializer_class(self):
        return None

    @action(detail=False, methods=["GET"], url_path='get-geocode')
    def get_geocode(self, request):
        latitude = request.GET.get('latitude')
        longitude = request.GET.get('longitude')
        address = request.GET.get('address')

        geocode_api = GoogleGeocodeAPI(api_key=settings.GOOGLE_GEOCODING_API_KEY)

        data = {}

        if latitude and longitude:
            data = geocode_api.get_geocode(latitude=latitude, longitude=longitude)
        elif address:
            address = address.replace(" ", "+")
            data = geocode_api.get_reverse_geocode(address=address)

        return Response(status=status.HTTP_200_OK, data={
            'data': data
        })

    @action(detail=False, methods=["GET"], url_path='get-distance')
    def get_distance(self, request):
        try:
            latitude1 = request.GET['latitude1']
            longitude1 = request.GET['longitude1']
            latitude2 = request.GET['latitude2']
            longitude2 = request.GET['longitude2']
        except Exception:
            error_data = {'message': "All latitudes and longitudes are required."}
            return Response(data=error_data, status=status.HTTP_400_BAD_REQUEST)

        try:
            coords_1 = (latitude1, longitude1)
            coords_2 = (latitude2, longitude2)
            distance = geopy_distance.distance(coords_1, coords_2).km
        except Exception:
            error_data = {'message': "Some of the latitudes or longitudes are wrong."}
            return Response(data=error_data, status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK, data={
            'distance': distance
        })
