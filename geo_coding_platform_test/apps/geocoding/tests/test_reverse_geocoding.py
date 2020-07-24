from rest_framework import status
from rest_framework.test import APITestCase


class DataSetTest(APITestCase):
    def setUp(self):
        self.url = "/api/geocoding/get-geocode/"

    def test_reverse_geocoding(self):
        data = {
            "address": "Cra. 45 72s36, Sabaneta, Antioquia, Colombia",
        }

        response = self.client.get(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        expected_location = {
            "lat": 6.1505095,
            "lng": -75.6168288
        }

        self.assertEqual(response.data['data']['results'][0]['geometry']['location'], expected_location)
