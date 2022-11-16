pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ping-server .'
            }
        }
        stage('Start Container') {
            steps {
                sh 'docker run -p 5001:5001 -d --name ping-server ping-server'
            }
        }

    }
}