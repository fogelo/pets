""" 
класс - это тип данных (str, list)
iterable - итерируемый объект, их несколько (list, dict ...)

list - список, коллекция пар ключ-значение, где ключем является порядковый номер
list - это тип данных
тип данных - это класс


Методы обычные:
1. append(item) - добавляет элемент в конец списка, мутирует исходный
2. extend(iterable) - добавляет в конец элменты из другого списка, мутирует исходный 
3. insert(index, item) - добавляет новый элемент по указанному индексу, мутирует
4. remove(item) - удаляет первый такой элемент, мутирует
5. pop(index) - удаляет элемент по индексу и возвращает его, мутирует
6. clear() - удаляет все элементы списка, мутирует
7. index(item, [startIndex], [endIndex]) - ищет индекс первого элемента, который равен item.
    startIndex и endIndex - необез. параметры, которые задают область поиска

8. count(item) - возвращает количество вхождений item
9. sort(key, reverse=false) - сортирует список, мутирует
    key - это функция, которая будет применена к каждому item перед сравнением

10. reverse() - разворачивает список, мутирует
11. copy() - возвращает поверхностную копию списка


Магические методы:
1. len() - возвращает длину интерируемого объекта __len__()
"""

myList = [1, 2, 3]

# * Методы обычные
myList.append(4)  # добавляет элемент в конец списка
myList.extend([4, 5, 6])  # добавляет в конец элменты из другого списка
myList.insert(4, 4.5)  # вставляет элемент но индексу
myList.remove(4)  # удаляет первый такой элемент
popItem = myList.pop(4)  # удаляет элемент по индексу и возвращает его
countItem = myList.count(4)  # возвращает количество вхождений item
myList.sort(key=lambda item: item / 2, reverse=True)  # сортирует список
myList.reverse()  # разворачивает список
myList.copy()  # возвращает поверхностную копию списка
# myList.clear() # удаляет все элементы списка


# * Магичекие методы
myListLen = myList.__len__()  # len(myList) - возвращает длину итерируемого объетка
myListItem = myList.__getitem__(2)  # myList[2] - возвращает элемент списка по индексу
myList.__setitem__(2, 77)  # myList[2] = 77 - устанавливает значение элемента по индексу
myList.__delitem__(2) # del myList[2] - удаляет элемент по индексу
myListIter = myList.__iter__() # возвращает итератор, который можно использовать для обхода по элементам списка
myListReversed = myList.__reversed__() # возвращает обратный итератор 
myListContains = myList.__contains__(77) # 77 in myList - проверяет, содержится ли элемент в списке
myListAdd = myList.__add__([77,88]) # myList + [77,88] возвращает результат сложения списков
myListMul = myList.__mul__(2) # myList * 2 возвращает результат умножения списка на число (если список слева от оператора умножения)
myListRMul = myList.__rmul__(2) # 2 * myList - r означает right
myList.__iadd__([33,44]) # myList += [33,44] - оператор добавления с присваиванем
myListRepr = myList.__repr__() # repr(myList) - возвращает строковое представление объекта для разработчиков, repr - representation
myListStr = myList.__str__() # str(myList) - возвращает строковое представление объекта для пользователей
myListEq = myList.__eq__([123]) # myList == [123] - проверяет на равенство
myListNe = myList.__ne__([123]) # myList !=[123] - проверяет на неравенство
myListLe = myList.__le__([1, 2]) # myList <= [1, 2] - проверяет, меньше ли или равен один список другому, le - less than or equal
myListGe = myList.__ge__([1, 2]) # myList >= [1, 2] - проверяет, больше ли или равен один список другому, ge - greater than or equal
myListGt = myList.__gt__([1, 2]) # myList > [1, 2] - проверяет, больше ли один список другого, gt - greater than
myListLt = myList.__lt__([1, 2]) # myList < [1, 2] - проверяет, меньше ли один список другого, lt - less than


myListSize = myList.__sizeof__() # возвращает размер списка в байтах
myList.__init__() # вызывается при создании экземпляра класса
myList.__subclasshook__(list, dict) # используется для проверки, является ли класс подклассом другого класса (возможны значения: True, False, NotImplemented)

#myList.__setattr__
#myList.__reduce__
#myList.__reduce_ex__
#myList.__qualname__
#myList.__new__
#myList.__module__
#myList.__getstate__
#myList.__hash__
#myList.__getattribute__
#myList.__init_subclass__
#myList.__format__
#myList.__dict__
#myList.__doc__
#myList.__annotations__
#myList.__dir__
#myList.__delattr__
#myList.__class_getitem__



# *

""" 
фишки

1) если переданный в качестве аргуемента index < 0, то отсчет будет начинаться с конца списка

"""
