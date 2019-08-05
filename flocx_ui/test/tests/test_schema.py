from unittest import TestCase
from schema import SchemaError

from flocx_ui.api.schema import (validate_uuid,
                                 validate_date,
                                 validate_offer_status,
                                 validate_offer)

class SchemaTests(TestCase):
    def test_valid_uuid(self):
        valid_uuid = '5dbdf9ab-4720-4549-8560-71135062fc4b'
        self.assertTrue(validate_uuid(valid_uuid))

    def test_invalid_uuid(self):
        invalid_uuid = 'invalid_uuid'
        try:
            validate_uuid(invalid_uuid)
            self.fail() # The above code should fail
        except SchemaError as err:
            self.assertIsNotNone(err)

    def test_valid_date(self):
        valid_date = '2019-07-24 13:59:14'
        self.assertTrue(validate_date(valid_date))

    def test_invalid_date(self):
        # Test a date that is completely invalid
        invalid_date1 = 'invalid_date'
        try:
            validate_date(invalid_date1)
            self.fail() # The above code should fail
        except SchemaError as err:
            self.assertEqual(str(err), 'invalid_date is not a valid date')

        # Test a date that is only formatted incorrectly
        invalid_date2 = '2016-7-16'
        try:
            validate_date(invalid_date2)
            self.fail() # The above code should fail
        except SchemaError as err:
            self.assertIsNotNone(err)

    def test_valid_offer_status(self):
        valid_offer = 'available'
        self.assertTrue(validate_offer_status(valid_offer))

    def test_invalid_offer_status(self):
        invalid_offer = 'invalid_offer'
        try:
            validate_offer_status(invalid_offer)
            self.fail() # The above code should fail
        except SchemaError as err:
            self.assertIsNotNone(err)

    def test_valid_offer(self):
        valid_offer = {
            'provider_offer_id': '90894712-3b21-4bf7-9899-b4234530ff8b',
            'project_id': '12a59a51-b4d6-497d-9f75-f56c409305c8',
            'server_id': 'fb878e3e-9425-4285-babf-0e58a7b091b2',
            'start_time': '2019-07-24 13:59:14',
            'end_time': '2019-07-24 13:59:14',
            'server_config': {
                'any_properties': True
            },
            'cost': 11
        }
        self.assertTrue(validate_offer(valid_offer))

    def test_invalid_offer(self):
        invalid_offer = {
            'this_is_invalid': True
        }
        try:
            validate_offer(invalid_offer)
            self.fail() # The above code should fail
        except SchemaError as err:
            self.assertIsNotNone(err)

    def test_invalid_offer_toggle_error(self):
        invalid_offer = {
            'this_is_invalid': True
        }

        try:
            self.assertFalse(validate_offer(invalid_offer, return_boolean=True))
        except SchemaError:
            self.fail() # Should not raise an exception
