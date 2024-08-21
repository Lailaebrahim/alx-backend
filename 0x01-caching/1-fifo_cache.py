#!/usr/bin/python3
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """
    Class BasicCache that inherits from BaseCaching and is a caching system
    """

    def __init__(self):
        super().__init__()
        
    def put(self, key, item):
        if key is None or item is None:
            return
        elif len(self.cache_data) >= self.MAX_ITEMS:
            key_to_remove = sorted(self.cache_data.keys())[0]
            self.cache_data.pop(key_to_remove)
            print("DISCARD: {}".format(key_to_remove))
        self.cache_data[key] = item
        
    def get(self, key):
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
