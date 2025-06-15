pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        sh """
          if docker images | grep -q pizzeria-front-img; then
              docker rmi -f pizzeria-front-img || true
          fi
        """

        sh """
          docker build -t pizzeria-front-img .
        """
      }
    }

    stage('Deploy') {
      steps {
        sh """
          if docker ps -a | grep -q pizzeria-front; then
            docker stop pizzeria-front || true
            docker rm pizzeria-front || true
          fi
        """

        sh """
          docker run -d --name pizzeria-front -p 8074:8080 --restart=always pizzeria-front-img
        """
      }
    }
  }
}