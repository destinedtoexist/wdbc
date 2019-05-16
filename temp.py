# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

import pandas as pd
import numpy as np

from sklearn import preprocessing
from sklearn import naive_bayes

from sklearn import metrics

from matplotlib import pyplot

import pickle

from sklearn.model_selection import train_test_split



#10 real valued features
features = ['radius', 'texture', 'perimeter', 'area', 'smoothness', 'compactness', 'concavity', 'concave_points', 'symmetry', 'fractal_dimension']

#standard error and largest(worst) for each of these 10 features are also calculated
features = features + [colname + "_se" for colname in features] + [colname + "_max" for colname in features]

#with open("features.names", "wb") as fp:
#    pickle.dump(features, fp)

#First column is ID Number and second is Diagnosis
header = ['id', 'diagnosis'] + features
# Read the wdbc dataset

original = pd.read_csv("wdbc.data", header=None, names=header)

#with open("original.dataframe", "wb") as fp:
#    pickle.dump(original, fp)

feature_matrix = original.loc[:,features]

correlation_matrix = np.corrcoef(feature_matrix, rowvar=False)

correlation_matrix = pd.DataFrame(correlation_matrix, index=features, columns=features)


target = original.values[:, 1].astype("str")

gnb = naive_bayes.GaussianNB()
gnb_model = gnb.fit(feature_matrix, original.loc[:, ['diagnosis']].values.ravel())

predicted = gnb_model.predict(feature_matrix)

np.sum(np.logical_and(predicted=='M', target=='M'))

predicted_prob = gnb_model.predict_proba(feature_matrix)
predicted_prob[:, 1]
metrics.average_precision_score(target=='M', predicted_prob[:,1])
precision, recall, _ = metrics.precision_recall_curve(target=='M', predicted_prob[:,1])

precision, recall, _

summary = original.describe()
summary.to_json()

split = train_test_split(original.loc[:, features], original.loc[:, ['diagnosis']], test_size=0.2)

