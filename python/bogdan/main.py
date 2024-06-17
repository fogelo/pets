print("anton")

# name = input("Введите имя: ") #input прервет выполнение кода и просит ввести что-то с клавиатуры

# print(name)
# print(dir(name)) # dir - отбразить все атрибуты объетка name

name = "orlov"
print(name.upper())

""" 
вот так объявляются и вызываются функции
"""


def my_name(name):
    print(name)


my_name("antor")


def sum_numbers(a, b):
    c = a + b
    return c


sum = sum_numbers(1, 5)
print(sum)

# id

print(id(my_name))
print(type(id(my_name)))

print(name[3:5])

print(int("2"))
print(bool(1))
print(1 == "1")
print(10 + "5") 
