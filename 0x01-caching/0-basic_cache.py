#!/usr/bin/python3
"""_summary_ BasicCache that inherits from BaseCaching"""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """Class BasicCache that inherits from BaseCaching and is a caching system

    Args:
        BaseCaching (_type_): *description*
    """

    def put(self, key, item):
        """_summary_ Add an item to the cache.

        Args:
            key (any): The key to associate with the item.
            item (any): The item to be added to the cache.
        """
        if key is None or item is None:
            return
        self.cache_data[key] = item

    def get(self, key):
        """_summary_ Retrieve item from cache

        Args:
            key (any): The key to associate with the item.
        """
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
