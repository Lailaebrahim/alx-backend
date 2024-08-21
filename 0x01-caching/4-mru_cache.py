#!/usr/bin/python3
"""
Class MRUCache that inherits from BaseCaching
"""
from base_caching import BaseCaching
from collections import OrderedDict


class MRUCache(BaseCaching):
    """
    Class FIFOCache that inherits from BaseCaching and is a caching system
    """

    def __init__(self):
        """
        Initializes the MRUCache instance
        """
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """
        Add an item to the cache.
        Args:
            key (any): The key to associate with the item.
            item (any): The item to be added to the cache.
        """
        if key is None or item is None:
            return
        elif len(self.cache_data) >= self.MAX_ITEMS:
            key_to_remove, _ = self.cache_data.popitem(False)
            print("DISCARD: {}".format(key_to_remove))
        self.cache_data[key] = item
        self.cache_data.move_to_end(key, last=False)

    def get(self, key):
        """
        Retrieve item from cache
        Args:
            key (any): The key to associate with the item.
        Returns:
            item(any): item associate with the key.
        """
        if key is None or key not in self.cache_data:
            return None
        self.cache_data.move_to_end(key, last=False)
        return self.cache_data[key]
