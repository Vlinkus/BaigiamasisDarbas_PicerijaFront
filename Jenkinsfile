pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        sh """
          if docker ps -a | grep -q pizzeria-front; then
            docker stop pizzeria-front || true
            docker rm pizzeria-front || true
          fi
        """

        sh """
          docker build -t pizzeria-front .
        """
      }
    }

    stage('Deploy') {
      steps {
        sh """
          docker run -d --name pizzeria-front -p 8074:8080 pizzeria-front
        """
      }
    }
  }
}