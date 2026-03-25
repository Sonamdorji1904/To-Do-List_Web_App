pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Sonamdorji1904/To-Do-List_Web_App.git',
                    credentialsId: 'github-creds'
            }
        }

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
            post {
                always {
                    junit 'junit.xml'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-creds') {
                        // Build and push backend image
                        def backendImage = docker.build('sonamdorji2005/be-todo:02240362', 'Backend')
                        backendImage.push()

                        // Build and push frontend image
                        def frontendImage = docker.build('sonamdorji2005/fe-todo:02240362', 'Frontend')
                        frontendImage.push()
                    }
                }
            }
        }
    }
}