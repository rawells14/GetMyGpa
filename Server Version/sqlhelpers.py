from sqlalchemy import create_engine
engine = create_engine('sqlite:///database.db')
#connection = engine.connect()


def initTable():
    engine.execute("CREATE TABLE user(username TEXT PRIMARY KEY, password TEXT)")

def insertUser(user, pswd):
    engine.execute('INSERT INTO user(username, password) VALUES(?, ?)', user, pswd)



#connection.close()
