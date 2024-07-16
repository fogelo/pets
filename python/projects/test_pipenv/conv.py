import subprocess
import os

def convert_odt_to_html(input_file, output_dir):
    # Проверяем, существует ли входной файл
    if not os.path.isfile(input_file):
        raise FileNotFoundError(f"Input file {input_file} does not exist.")
    
    # Проверяем, существует ли выходная директория, если нет - создаем её
    if not os.path.isdir(output_dir):
        os.makedirs(output_dir)

    # Команда для конвертации
    command = [
        "/Applications/LibreOffice.app/Contents/MacOS/soffice",
        "--headless",
        "--convert-to", "html",
        "--outdir", output_dir,
        input_file
    ]

    # Выполнение команды
    try:
        subprocess.run(command, check=True)
        print(f"File {input_file} successfully converted to HTML and saved in {output_dir}")
    except subprocess.CalledProcessError as e:
        print(f"An error occurred while converting the file: {e}")

# Пример использования
input_file = "./files/Описание_проектных_решений_v5.3.odt"
output_dir = "./files"
convert_odt_to_html(input_file, output_dir)