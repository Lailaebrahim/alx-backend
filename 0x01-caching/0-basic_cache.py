#!/usr/bin/python3
"""_summary_ BasicCache that inherits from BaseCaching
  """
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """_summary_
    class BasicCache that inherits from BaseCaching and is a caching system
    Args:
        BaseCaching (_type_): _description_
    """

    def put(self, key, item):
      if key is None or item is None:
        return
      self.cache_data[key] = item
      
    def get(self, key):
      if key is None or key not in self.cache_data:
        return None
      return self.cache_data[key]
