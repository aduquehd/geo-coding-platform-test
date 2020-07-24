from rest_framework import status
from rest_framework.test import APITestCase


class DataSetTest(APITestCase):
    def setUp(self):
        self.url = "/api/geocoding/get-distance/"

    def test_geocoding_distance(self):
        data = {
            "latitude1": "6.150096",
            "longitude1": "-75.637175",
            "latitude2": "6.151131",
            "longitude2": "-75.643151",
        }

        response = self.client.get(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['distance'], 0.671271309015767)

    def test_geocoding_distance_missing_params(self):
        data = {
            "latitude1": "6.150096",
            "longitude1": "-75.637175",
            "latitude2": "6.151131",
        }

        response = self.client.get(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['message'], "All latitudes and longitudes are required.")

    def test_geocoding_distance_wrong_values(self):
        data = {
            "latitude1": "6.150096",
            "longitude1": "-75.637175",
            "latitude2": "6.151131",
            "longitude2": "-57AAAAAA",
        }

        response = self.client.get(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['message'], "Some of the latitudes or longitudes are wrong.")
