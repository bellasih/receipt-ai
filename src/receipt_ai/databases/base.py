from abc import abstractmethod

class Dao(object): 
    @abstractmethod
    def init_conn(): 
        raise NotImplementedError
    
    @abstractmethod
    def insert(): 
        raise NotImplementedError

    @abstractmethod
    def update(): 
        raise NotImplementedError 

    @abstractmethod
    def delete(): 
        raise NotImplementedError 

    @abstractmethod
    def select(): 
        raise NotImplementedError