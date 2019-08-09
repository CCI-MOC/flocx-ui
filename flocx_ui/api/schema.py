import logging
from datetime import datetime

from schema import (Regex,
                    Schema,
                    And,
                    Or,
                    Use,
                    SchemaError)

UUID_REGEX = r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'

def return_boolean_decorator(func):
    """Decorator to intercept the **return_boolean keyword argument
        and return False if there is a SchemaError instead of raising
        an exception

    :param func: The function to be wrapped
    :return: A higher order component that handles the try and except
    """
    def handle_boolean_keyword(*args, **kwargs):
        """A higher order component to handle the return_boolean keyword argument

        :param *args: Any args to pass to the decorated function
        :param **kwargs: See below
        :raises SchemaError: If `return_boolean` is False
        :return: The return value of the decorated function if a SchemaError is not thrown
            Otherwise it will return False if `return_boolean` is True

        :Keyword Arguments:
        * return_boolean:
            Whether to raise SchemaError or return false if the offer is invalid
        """
        return_boolean = kwargs.pop('return_boolean', None)
        try:
            return func(*args, **kwargs)
        except SchemaError as err:
            if return_boolean:
                logging.debug(err)
                return False
            raise err
    return handle_boolean_keyword

@return_boolean_decorator
def validate_uuid(uuid, **_kwargs):
    """Determines if the uuid parameter is a valid uuid

    :param uuid: The uuid to be validated
    :param **kwargs: See below
    :raises SchemaError: If the uuid is not valid
    :return: True if valid. Raises a SchemaError otherwise

    :Keyword Arguments:
        * return_boolean:
            Whether to raise SchemaError or return false if the offer is invalid
    """

    return Regex(UUID_REGEX).validate(uuid)

@return_boolean_decorator
def validate_date(date_string):
    """Determines if the date_string parameter is a valid date
        and that it is formatted correctly

    :param date_string: The date to be validated
    :param **kwargs: See below
    :raises SchemaError: If the date is invalid or not formatted correctly
    :return: True if the date is valid and formatted correctly.
            Raises a SchemaError otherwise

    :Keyword Arguments:
        * return_boolean:
            Whether to raise SchemaError or return false if the offer is invalid
    """
    try:
        datetime.strptime(date_string, '%Y-%m-%d %H:%M:%S')
        return True
    except ValueError:
        raise SchemaError('{} is not a valid date'.format(date_string))

@return_boolean_decorator
def validate_offer_status(status):
    """Determines if the status is one of the valid status options

    :param status: The status to be validated
    :param **kwargs: See below
    :raises SchemaError: If the status is not one of the options
    :return: True if the status is one of the options. Raises a SchemaError otherwise

    :Keyword Arguments:
        * return_boolean:
            Whether to raise SchemaError or return false if the offer is invalid
    """
    status_enum = [
        'available',
        'matched',
        'used',
        'cancelled',
        'expired'
    ]

    return Schema(And(Use(lambda s: [s]), status_enum)).validate(status)

@return_boolean_decorator
def validate_offer(offer, **_kwargs):
    """Determines if an offer dictionary is valid

    :param offer: The offer to be validated
    :param **kwargs: See below
    :raises SchemaError: If the offer schema is not valid
    :return: True if the offer schema is valid. Raises a SchemaError otherwise

    :Keyword Arguments:
        * return_boolean:
            Whether to raise SchemaError or return false if the offer is invalid
    """
    return Schema({
        'provider_offer_id': validate_uuid,
        'project_id': validate_uuid,
        'server_id': validate_uuid,
        'start_time': validate_date,
        'end_time': validate_date,
        'server_config': object,
        'cost': Or(int, float)
    }).validate(offer)

@return_boolean_decorator
def validate_provider_offer(offer, **_kwargs):
    """Determines if a provider offer dictionary is valid

    :param offer: The provider offer to be validated
    :param **kwargs: See below
    :raises SchemaError: If the schema is not valid
    :return: True if the schema is valid. Raises a SchemaError otherwise

    :Keyword Arguments:
        * return_boolean:
            Whether to raise SchemaError or return false if the offer is invalid
    """
    return Schema({
        'resource_type': 'ironic_node', # This should be changed to an enum validator after devconf
        'resource_uuid': validate_uuid,
        'start_date': validate_date,
        'end_date': validate_date,
        'properties': object
    }).validate(offer)

@return_boolean_decorator
def validate_bid(bid, **_kwargs):
    """Determines if a bid dictionary is valid

    :param bid: The bid to be validated
    :param **kwargs: See below
    :return: True if the schema is valid. Raises a SchemaError otherwise

    :Keyword Arguments:
        * return_boolean:
            Whether to raise a SchemaError or return false if the bid is invalid
    """
    return Schema({
        'start_time': validate_date,
        'end_time': validate_date,
        'duration': Or(int, float),
        'server_quantity': int,
        'status': validate_offer_status,
        'server_config_query': object,
        'cost': Or(int, float)
    }).validate(bid)
