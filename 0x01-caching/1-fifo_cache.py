#!/usr/bin/python3
from base_caching import BaseCaching
"""_summary_
    Class FIFOCache that inherits from BaseCaching
"""


class FIFOCache(BaseCaching):
    """
    Class FIFOCache that inherits from BaseCaching and is a caching system
    """

    def __init__(self):
        """init method
        """
        super().__init__()
        
    def put(self, key, item):
        """_summary_
        Add an item to the cache.
        Args:
            key (any): The key to associate with the item.
            item (any): The item to be added to the cache.
        """
        if key is None or item is None:
            return
        elif len(self.cache_data) >= self.MAX_ITEMS:
            key_to_remove = sorted(self.cache_data.keys())[0]
            self.cache_data.pop(key_to_remove)
            print("DISCARD: {}".format(key_to_remove))
        self.cache_data[key] = item
        
    def get(self, key):
        """_summary_
        Retrieve item from cache
        Args:
            key (any): The key to associate with the item.
        Returns:
            item(any): item associate with the key.
        """
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
