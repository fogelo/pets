""" 
import(): Импортирует модуль.
"""

#@ Математика. Работа с числами
# abs() - озвращает абсолютное значение числа.
abs(-5) # Output: 5

# round() - возвращает округленное число.
round(3.14159, 2)  # Output: 3.14

# pow() - возвращает результат возведения числа в степень.
pow(2, 3)  # Output: 8

# complex() - возвращает комплексное число.
complex(2, 3) # Output: (2+3j)

# divmod() - возвращает частное и остаток от деления двух чисел.
divmod(10, 3)  # Output: (3, 1)

# bin() - преобразует целое число в двоичное строковое представление.
bin(10) # Output: '0b1010', ob - означает двоичную систему

# oct() - реобразует целое число в восьмеричное строковое представление.
oct(8)  # Output: '0o10'

# hex(): Преобразует целое число в шестнадцатеричное строковое представление.
hex(255)  # Output: '0xff'


#@ Функции для работы со строками 
# ascii(): Возвращает строку, содержащую представление объекта в ASCII. ASCII (англ. American standard code for information interchange) — стандарт кодирования знаков латинского алфавита
ascii('привет')  # Output: '\u043f\u0440\u0438\u0432\u0435\u0442'

# chr(): Возвращает символ, представляющий указанный Unicode.
chr(97)  # Output: 'a'

# ord(): Возвращает Unicode код символа.
ord('a') # Output: 97

# format(): Форматирует строку.
print("Hello, {}!".format("World"))  # Output: Hello, World!

# repr(): Возвращает строковое представление объекта.
repr([1, 2, 3])  # Output: '[1, 2, 3]'

#@ Функции для работы с итераторами и итерируемыми объектами
# iter() - возвращает итератор для итерируемого объекта.
# next() - возвращает следующий элемент итератора.
it = iter([1, 2, 3]) # Output: <list_iterator object at 0x104f879d0>
next(it)  # Output: 1
next(it)  # Output: 2

# all(): Возвращает True, если все элементы итерируемого объекта истинны.
all([True, False, True])  # Output: False

# any(): Возвращает True, если хотя бы один элемент итерируемого объекта истинен.
any([False, False, True])  # Output: True

# sum(): Возвращает сумму элементов итерируемого объекта.
sum((1, 2, 3))  # Output: 6

# max() - возвращает наибольший элемент итерируемого объекта.
max(1, 2, 3)  # Output: 3

# min() - возвращает наименьший элемент итерируемого объекта.
min(1, 2, 3)  # Output: 1

# filter(): Возвращает итератор с элементами, для которых функция возвращает True.
def is_even(n):
    return n % 2 == 0

list(filter(is_even, [1, 2, 3, 4, 5]))  # [2, 4]

# map(): Применяет функцию к каждому элементу итерируемого объекта.
my_tuple = (1, 2, 3)
squared = map(lambda x: x**2, my_tuple)
print(tuple(squared))  # Output: (1, 4, 9)

# sorted(): Возвращает отсортированный список элементов.
sorted([3, 1, 2])  # Output: [1, 2, 3]

# reversed(): Возвращает итератор, который перебирает элементы в обратном порядке.  
list(reversed([1, 2, 3]))  # Output: [3, 2, 1]

# zip(): Возвращает итератор, объединяющий элементы из нескольких итерируемых объектов.
a = [1, 2, 3]
b = ['a', 'b', 'c']
print(list(zip(a, b)))  # Output: [(1, 'a'), (2, 'b'), (3, 'c')]

# len(): Возвращает длину объекта.
len([1, 2, 3])  # Output: 3

#@ Функции для работы с типами данных их преобразованием 
# list(): Создает новый список.
l = list((1, 2, 3))
print(l)  # Output: [1, 2, 3]

# str(): Преобразует объект в строку.
str(123)  # Output: '123'

# tuple(): Создает новый кортеж.
t = tuple([1, 2, 3])
print(t)  # Output: (1, 2, 3)

# set(): Создает новое множество.
s = set([1, 2, 3])
print(s)  # Output: {1, 2, 3}

# dict(): Создает новый словарь.
d = dict(a=1, b=2, c=3)
print(d)  # Output: {'a': 1, 'b': 2, 'c': 3}

# object(): Создает новый объект.
o = object()
print(o)  # Output: <object object at 0x...>

# range(): Возвращает объект диапазона.
r = range(5)
print(list(r))  # Output: [0, 1, 2, 3, 4]


# enumerate(): Возвращает итератор, генерирующий пары (индекс, значение).
my_tuple = ('a', 'b', 'c')
for index, value in enumerate(my_tuple):
    print(index, value)
# Output:
# 0 a
# 1 b
# 2 c

# int() - преобразует строку или число в целое число.
int('42')  # Output: 42

# float() - преобразует строку или число в число с плавающей точкой.
float('3.14')  # Output: 3.14

# bool(): Преобразует значение в логическое значение True или False.
print(bool(1))  # Output: True
print(bool(0))  # Output: False

# slice(): Возвращает объект среза.
s = slice(1, 5, 2)
print([0, 1, 2, 3, 4, 5][s])  # Output: [1, 3]

#! bytearray(): Возвращает объект bytearray.
b = bytearray([65, 66, 67])
print(b)  # Output: bytearray(b'ABC')

#! bytes(): Возвращает объект bytes.
b = bytes([65, 66, 67])
print(b)  # Output: b'ABC'

#! memoryview(): Возвращает объект memoryview.
m = memoryview(bytes([1, 2, 3]))
print(m.tolist())  # Output: [1, 2, 3]

# frozenset(): Возвращает неизменяемое множество.
fs = frozenset([1, 2, 3])
print(fs)  # Output: frozenset({1, 2, 3})

# property(): Возвращает объект свойства.
class MyClass:
    def __init__(self, value):
        self._value = value
    
    @property
    def value(self):
        return self._value
    
    @value.setter
    def value(self, value):
        self._value = value

obj = MyClass(10)
print(obj.value)  # Output: 10
obj.value = 20
print(obj.value)  # Output: 20

# staticmethod(): Преобразует метод в статический метод.
class MyClass:
    @staticmethod
    def my_static_method():
        print("Это статический метод")

MyClass.my_static_method()  # Output: Это статический метод

#@ Функции для работы с объектами и их атрибутами
# callable(): Проверяет, является ли объект вызываемым.
def my_function():
    pass

print(callable(my_function))  # Output: True
print(callable(123))  # Output: False

# classmethod(): Преобразует метод в метод класса.
class MyClass:
    @classmethod
    def my_class_method(cls):
        print("Это метод класса")

MyClass.my_class_method()  # Output: Это метод класса

# delattr(): Удаляет атрибут объекта.
class MyClass:
    attribute = "значение"

obj = MyClass()
print(hasattr(obj, 'attribute'))  # Output: True
delattr(obj, 'attribute')
print(hasattr(obj, 'attribute'))  # Output: False


# setattr(): Устанавливает значение атрибута объекта.
class MyClass:
    pass

obj = MyClass()
setattr(obj, 'attribute', 'значение')
print(obj.attribute)  # Output: значение

# getattr(): Возвращает значение атрибута объекта.
class MyClass:
    attribute = "значение"

obj = MyClass()
print(getattr(obj, 'attribute'))  # Output: значение

# hasattr(): Проверяет, имеет ли объект указанный атрибут.
class MyClass:
    attribute = "значение"

obj = MyClass()
print(hasattr(obj, 'attribute'))  # Output: True

# dir(): Возвращает список атрибутов и методов объекта.
print(dir([]))  # Output: список атрибутов и методов списка

# vars(): Возвращает словарь атрибутов объекта.
class MyClass:
    def __init__(self):
        self.attribute = "значение"

obj = MyClass()
print(vars(obj))  # Output: {'attribute': 'значение'}



#@ Ввод-вывод и работа с файлами
# input(): Считывает строку текста с ввода.
user_input = input("Введите что-нибудь: ")
print("Вы ввели:", user_input)

# open(): Открывает файл и возвращает соответствующий объект файла.
with open('example.txt', 'w') as f:
    f.write('Hello, World!')

with open('example.txt', 'r') as f:
    print(f.read())  # Output: Hello, World!

# print(): Выводит указанные объекты.
print("Hello, World!")  # Output: Hello, World!


#@ Функциия для работы с пространством имен и идентификацией обектов
# globals(): Возвращает словарь текущего глобального пространства имен.
print(globals())  # Output: глобальные переменные и их значения

# locals(): Возвращает словарь текущего локального пространства имен.
def my_function():
    local_var = 42
    print(locals())

my_function()  # Output: {'local_var': 42}

# id(): Возвращает уникальный идентификатор объекта.
a = 10
print(id(a))  # Output: уникальный идентификатор

# hash(): Возвращает хеш-значение объекта.
my_tuple = (1, 2, 3)
print(hash(my_tuple))  # Output: (значение хеша, зависит от системы)

# type(): Возвращает тип (класс) объекта.
print(type(123))  # Output: <class 'int'>

#@ Функции для проверки типов (классов) и свойств объектов
# isinstance(): Проверяет, является ли объект экземпляром указанного класса.
print(isinstance(123, int))  # Output: True
print(isinstance(123, str))  # Output: False

# issubclass(): Проверяет, является ли класс подклассом другого класса.
class Parent:
    pass

class Child(Parent):
    pass

print(issubclass(Child, Parent))  # Output: True
print(issubclass(Parent, Child))  # Output: False

#@ Функции для выполнения кода и помощи

#! compile(): Компилирует исходный код в объект кода.
code = "print('Hello, World!')"
compiled_code = compile(code, '<string>', 'exec')
exec(compiled_code)  # Output: Hello, World!

#! breakpoint(): Останавливает выполнение программы и запускает отладчик.
print("Before breakpoint")
breakpoint()  # Запускает отладчик
print("After breakpoint")


#! eval(): Выполняет выражение Python из строки.
expression = "1 + 2 * 3"
result = eval(expression)
print(result)  # Output: 7

#! exec(): Выполняет динамически созданный программный код.
code = """
for i in range(5):
    print(i)
"""
exec(code)
# Output:
# 0
# 1
# 2
# 3
# 4

# help(): Вызывает встроенную систему помощи.
help(print)  # Output: документация по функции print


#@ Другие функции 
# super(): Возвращает объект представителя родительского класса.
class Parent:
    def __init__(self):
        print("Родительский класс")

class Child(Parent):
    def __init__(self):
        super().__init__()
        print("Дочерний класс")

child = Child()
# Output:
# Родительский класс
# Дочерний класс


