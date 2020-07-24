from rest_framework import status
from rest_framework.test import APITestCase


class DataSetTest(APITestCase):
    def setUp(self):
        self.url = "/api/geocoding/get-geocode/"

    def test_geocoding(self):
        data = {
            "latitude": "6.1504856",
            "longitude": "-75.61687859",
        }

        response = self.client.get(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        expected_address = "Cra. 45 #72s36, Sabaneta, Antioquia, Colombia"
        self.assertEqual(response.data['data']['results'][0]['formatted_address'], expected_address)
