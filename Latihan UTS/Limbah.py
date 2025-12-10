from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_iris

# load data
data = load_iris()
X = data.data
y = data.target

# split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# buat model
model = RandomForestClassifier(n_estimators=100, random_state=42)

# training
model.fit(X_train, y_train)

# akurasi
acc = model.score(X_test, y_test)
print("Akurasi:", acc)
