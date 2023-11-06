import sys

data_to_pass_back = 'Send this to node process.'

#answer key: 1: No, 2: Not really, 3: Not sure, 4: Yeah kinda, 5: Yup
#Q1 First question!
# Is your problem something you have a hard time talking to others about?

#Q2. Are you having a hard time focusing on things you enjoy, such as your hobbies?

#Q3. Does this issue also affect those around you? It must be worrying

#Q4. 

#for string input
#input = sys.argv[1] #should be the character choice
# for int input 
qNum = int(sys.argv[1])
character = sys.argv[2]

if qNum == 1:
    if character == "Alice":
        print("Alice: First Question!")
    elif character == "Sora":
        print("Sora: First Question!")
elif qNum == 2:
    print("Second Question!")
elif qNum == 3:
    print("Third Question!")
elif qNum == 4:
    print("Fourth Question!")
else:
    print("Fifth Question")

#output = data_to_pass_back
output = 2

calc = character
#print(calc)

sys.stdout.flush();
