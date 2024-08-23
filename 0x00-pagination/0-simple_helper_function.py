#!/usr/bin/python3
""" a function named index_range that takes two integer args page and page_size
"""


def index_range(page: int, page_size: int) -> tuple:
    """
    The function should return a tuple of size two containing
    a start index and an end index corresponding
    to the range of indexes to return in a list for 
    those particular pagination parameters.

    Args:
        page (int): _description_
        page_size (int): _description_

    Returns:
        tuple: _description_
    """
    return ((page - 1) * page_size, ((page - 1) * page_size) + page_size)
