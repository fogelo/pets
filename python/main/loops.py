import array

""" 
Циклы используются для перебора элементов последовательностей.
Итерируемый объект (itarable) - объект, который может быть преращен в итератор (коллекция или последовательности элементов)
Итератор (iterator) - объект, который предоставляет метод __next__ для последовательного доступа к элементам. 
Итератор хранит текущее соостояние итерации и знает какой элемент будет следующим

Последовательности (коллекции):
1) list - список
2) dict - словарь
3) set - набор 
4) tuple - кортеж
5) str - строка
6) range - диапазон
7) модуль array - массив

Циклы:
1) for in
2) сокращенный for in - используется для создания новых последовательностей 
3) while

Операторы циклов:
1) break - выход из цикла
2) continue - переход к следующей итерации цикла
"""

# * Коллекции


my_list = [1, 2, 3, "apple", True, 2]
my_dict = {"name": "anton", "height": 180, "age": 33}
my_set = {1, 2, 3, "apple", True}
my_tuple = (1, 2, 3, "apple", True, 2)
my_str = "apple python"
my_range = range(5)
my_array = array.array(
    "i", [1, 2, 3, 4, 5]
)  # отличается от list тем, что позволяет хранить элементы только одного типа (в данном случае i - целые числа со знаком)


# @ Примеры переборов последовательностей c помощью for in

# * list
for item in my_list:
    print(item)

# * dict
for key in my_dict:
    print(key, my_dict[key])

for value in my_dict.values():
    print(value)

for key, value in my_dict.items():
    print(key, value)

# * set
for item in my_set:
    print(item)

# * tuple
for item in my_tuple:
    print(item)

# * str
for char in my_str:
    print(char)

# * range
for number in my_range:
    print(number)

# * array
for item in my_array:
    print(item)

# @ Примеры возможных применений сокращенного for in
# * получение новой последовательности на базе существующей
my_list2 = [str(item) for item in my_list]
my_dict2 = [my_dict[key] for key in my_dict]

# * фильтрация
my_list3 = [item>]

# @ Примеры переборов последовательностей c помощью while
