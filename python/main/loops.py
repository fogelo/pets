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

Генератор (generator) - это последовательность элементов. К элементам генератора нельзя получить доступ по индексу, но можно произвести итерацию.
Преимущесто генараторов - это его размер, итерация выполняется быстрее для больших последовательностей 
"""


# @ Примеры переборов последовательностей c помощью for in

# * Коллекции
my_list = [1, 2, 3, "apple", True, 2]
my_dict = {"name": "anton", "height": 180, "age": 33}
my_set = {1, 2, 3, "apple", True}
my_tuple = (1, 2, 3, "apple", True, 2)
my_str = "apple python"
my_range = range(10)
my_array = array.array(
    "i", [1, 2, 3, 4, 5]
)  # отличается от list тем, что позволяет хранить элементы только одного типа (в данном случае i - целые числа со знаком)

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

# * создание списка(кортежа, набора) квадратов чисел
squares1 = [number**2 for number in range(10)]
squares2 = {number**2 for number in range(10)}
squares3 = (number**2 for number in range(10))  # получим экземпляр класса generator


# * фильтрация списка
even_numbers = [number for number in range(10) if number % 2 == 0]

# * преобразование списка строк
words = ["hello", "world", "python", "is", "awesome"]
upper_words = [word.upper() for word in words]

# * создание словаря из списков
keys = ["name", "age", "gender"]
values = ["anton", 33, "male"]
my_dict = {keys[i]: values[i] for i in range(len(keys))}

# * создание списка кортежей
pairs = [(number, number**2) for number in range(10)]

# * преобразование в плоский список
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat_list = [num for row in matrix for num in row]

# * замена символов в строке
sentence = "The quick brown fox"
vowels = "aeiou"
filtered_sentence = "".join([char for char in sentence if char not in vowels])

# @ Примеры переборов последовательностей c помощью while

# * Простой пример

i = 1
while i <= 5:
    print(i)
    i += 1

# * Бесконечный цикл c полем ввода

# while True:
#     user_input = input("Введите stop, чтобы остановить: ")
#     if user_input == "stop":
#         break
#     print("Вы ввели: ", user_input)

# * Обработка элементов списка
fruits = ["apple", "orange", "banana"]
index = 0
while len(fruits) > index:
    print(fruits[index])
    index += 1
