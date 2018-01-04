import os, codecs

ultimate_file = input('[OPEN]: Please enter path and what file you want to build= ')

if(os.path.exists(ultimate_file)):
	file_source = str(codecs.open(ultimate_file, 'r').read())
	file_it = file_source
	level = 1
	space = '  '

	while True:
		file_it = file_it.replace(space, '')

		if level >= 77:
			break

		level += 1

	file_it = file_it.replace('	', '')
	file_it = file_it.replace('\n\n', '')
	file_it = file_it.replace('\n', '')

	production_file = input('[SAVE]: Please enter path and a production file name= ')
	production_source = open(production_file, 'w')
	production_source.write(file_it)

	print('[SUCCESS]: alhamdulillah...')
else:
	print('[ERROR]: File not found')