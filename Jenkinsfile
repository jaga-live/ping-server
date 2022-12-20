pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ping-server .'
            }
        }
        stage('Stop running Container') {
            steps {
                sh 'docker rm ping-server --force'
            }
        }
        stage('Start Container') {
            steps {
                sh 'docker run -p 5001:5001 -d --name ping-server ping-server'
            }
        }

    }
}