#!/usr/bin/python3
"""
Class LFUCache that inherits from BaseCaching
"""
from base_caching import BaseCaching
from collections import OrderedDict


class LFUCache(BaseCaching):
    """
    Class LFUCache that inherits from BaseCaching and is a caching system
    """

    def __init__(self):
        """
        Initializes the LFUCache instance
        """
        super().__init__()
        self.cache_data = OrderedDict()
        self.keys_freq = {}

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
            key_to_remove, _ = max(self.keys_freq.items(), key=lambda x: x[1])
            print("DISCARD: {}".format(key_to_remove))
            del self.cache_data[key_to_remove]
            del self.keys_freq[key_to_remove]
        if key in self.cache_data:
            self.keys_freq[key] += 1
            self.cache_data[key] = item
        else:
            self.keys_freq[key] = 1
            self.cache_data[key] = item

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
        self.keys_freq[key] += 1
        return self.cache_data[key]
