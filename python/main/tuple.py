""" 
tuple - кортеж, коллекция объектов
Порядок объектов        - да
Изменяемый              - нет
Уникальность объектов   - нет


Когда с ними работать:
Кортежи полезны, когда нужно гарантировать неизменность данных и 
работать с неизменяемыми последовательностями. Они также могут использоваться в качестве ключей в словарях, в отличие от списков.
"""

my_tuple = (1, 2, 3, "apple", 1, [1,2,3], [1,2,3])


#@ Обычные методы
my_typle_count = my_tuple.count([1,2,3]) # возвращает количество вхождений переданного объекта
my_tuple_index = my_tuple.index("apple") # возвращает индекс переданного объекта в кортеже

#@ Магические методы
# my_tuple.__add__
# my_tuple.__annotations__
# my_tuple.__class__
# my_tuple.__class_getitem__
# my_tuple.__contains__
# my_tuple.__delattr__
# my_tuple.__dict__
# my_tuple.__dir__
# my_tuple.__doc__
# my_tuple.__eq__
# my_tuple.__format__
# my_tuple.__ge__
# my_tuple.__getattribute__
# my_tuple.__getitem__
# my_tuple.__getstate__
# my_tuple.__gt__
# my_tuple.__hash__
# my_tuple.__init__
# my_tuple.__init_subclass__
# my_tuple.__iter__
# my_tuple.__le__
# my_tuple.__len__
# my_tuple.__lt__
# my_tuple.__module__
# my_tuple.__mul__
# my_tuple.__ne__
# my_tuple.__new__
# my_tuple.__qualname__
# my_tuple.__reduce__
# my_tuple.__reduce_ex__
# my_tuple.__repr__
# my_tuple.__reversed__
# my_tuple.__rmul__
# my_tuple.__setattr__
# my_tuple.__sizeof__
# my_tuple.__str__
# my_tuple.__subclasshook__

#@ Встроенные функции
tuple_max = max((1,2,3)) # возвращает максимальное число или строку с наибольшим кол-м символов (работает только со строками или только с числами)
tuple_min = min((1,2,3)) # возвращает минимальное число или строку с наибольшим кол-м символов (работает только со строками или только с числами)
tuple_sum = sum((1,2,3)) # возвращает сумму чисел кортежа (работает только с числами)
tuple_sorted = sorted((1,2,3)) # возвращает отсортированный кортеж (работает только со строками или только с числами)
tuple_any = any((1,2,3)) # возвращает True если хотябы один элемент кортежа является истинным
tuple_all = all((1,2,3)) # возвращает True если все элементы кортежа являются истинными

tuple_tuple = tuple([1,2,3]) # преобразует итерируемый объект в кортеж

# enumerate(my_tuple) - возвращает объект-итератор, который генерирует пары (индекс-значение) для элементов кортежа
my_tuple = ('a', 'b', 'c')
for index, value in enumerate(my_tuple):
    print(index, value)
# Output:
# 0 a
# 1 b
# 2 c

# zip(tuple1, tuple2) - возвращает итертор кортежей, объединяя элементы из нескольких итерируемых объектов (например списков или кортежей)
tuple1 = (1, 2, 3)
tuple2 = ('a', 'b', 'c')
zipped = zip(tuple1, tuple2)
print(list(zipped))  # Output: [(1, 'a'), (2, 'b'), (3, 'c')]

# map() - применяет функцию к каждому элементу итерируемого объекта и возвращает объект-итератор с результатами
tuple1 = (1,2,3)
squared = map(lambda x: x**2, tuple1)
print(tuple(squared))  # Output: (1, 4, 9)

# filter() - применяет функцию к каждому элементу итерируемого объекта и возвращает объект-итератор, содержащий элементы итерируемого объекта, для которых переданная функция возвращает истинное значение
tuple1 = (1,2,3,4,5)
filtered = filter(lambda x: x % 2 == 0, tuple1)
print(tuple(filtered)) # Output: (2, 4)