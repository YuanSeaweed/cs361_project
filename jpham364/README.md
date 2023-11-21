Instructions for foodie.py microservice:

File name: ms.py

This python script opens a certain amount of txt files to read data. Since each file contains restaurants of a specific cuisine,
all the content of the file gets parsed into a list, where a random index is selected. A random restaurant gets picked in this list 
and gets added to another list called outputlist, which will hold all the restaurants to be written to a file called output.txt, which 
is the end goal of this microservice. 

By using the value at the end of the first text file, we know how many files we need to iterate through. The script iteratively goes 
through all files and selects one restaurant from each one to be added to outputlist. Finally, all the chosen restaurants are written 
to a file called output.txt. The results are also printed to the command line 
interface.