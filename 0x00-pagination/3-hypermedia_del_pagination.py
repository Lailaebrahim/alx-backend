#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import List


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
    """
    Get the hypermedia pagination info for a dataset
    
    Args:
        index (int, optional): the current start index of the return page.
                                Defaults to None.
        page_size (int, optional): the current page size.
                                    Defaults to 10.
    
    Returns:
        Dict: 
         index: the current start index of the return page.
         next_index: the next index to query with. 
         page_size: the current page size
         data: the actual page of the dataset
    """
    data = self.indexed_dataset()
    
    # Handle the case where index is None
    if index is None:
        index = 0
    
    assert index >= 0 and index <= max(data.keys()), "Index out of range"
    
    page_data = []
    current_index = index
    
    while len(page_data) < page_size and current_index <= max(data.keys()):
        if current_index in data:
            page_data.append(data[current_index])
        current_index += 1
    
    next_index = current_index if current_index <= max(data.keys()) else None
    
    page_info = {
        'index': index,
        'next_index': next_index,
        'page_size': page_size,
        'data': page_data,
    }
    
    return page_info
