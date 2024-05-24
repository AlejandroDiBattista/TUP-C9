# react_to_standalone.rb

require 'fileutils'


# Concatena archivos CSS, asegurándose de que index.css esté primero
def concat_css_files(src_directory)
  css_files = Dir.glob(File.join(src_directory, '**', '*.css')).sort
  index_css = css_files.delete(File.join(src_directory, 'index.css'))
  css_files.unshift(index_css) if index_css
  css_content = css_files.map { |file| File.read(file) }.join("\n")
  File.write(File.join(src_directory, 'estilo.css'), css_content)
end

# Concatena archivos JSX, eliminando importaciones y exportaciones
def concat_jsx_files(src_directory)
  jsx_files = Dir.glob(File.join(src_directory, '**', '*.jsx'))
  jsx_content = jsx_files.map do |file|
    content = File.read(file)
    content.gsub!(/^import .*$/, '') # Elimina importaciones
    content.gsub!(/^export .*function/, 'function') # Elimina exportaciones directas
    content.gsub!(/^export .*\n/, '') # Elimina líneas de exportación independientes
    content
  end.join("\n")
  File.write(File.join(src_directory, 'codigo.jsx'), jsx_content)
end

# Recorre todas las subcarpetas en busca de la carpeta 'src'
def process_react_projects(root_directory)
  Dir.glob(File.join(root_directory, '**', 'src')).each do |src_directory|
    puts "Procesando: #{src_directory}"
    concat_css_files(src_directory)
    concat_jsx_files(src_directory)
    puts "Archivos generados en: #{src_directory}"
  end

end

# Directorio de origen (ajústalo según tu estructura de carpetas)
root_directory = 'C:/Users/administrator/Documents/GitHub/TUP-C9/practicos'

# Inicia el procesamiento

def delete_node_modules(directory)
  puts "> Eliminando node_modules en: #{directory}"
  i = 0 
  Dir.glob(File.join(directory, '**', 'node_modules')).each do |node_modules_dir|
    i += 1
    puts "- %2i) Eliminando: #{node_modules_dir}" % i 

    FileUtils.rm_rf(node_modules_dir)
  end
  puts "Se eliminaron #{i} carpetas node_modules"
end

delete_node_modules(root_directory)
process_react_projects(root_directory)
