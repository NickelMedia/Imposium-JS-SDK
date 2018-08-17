#!groovy

pipeline {
  agent any
  environment {
    LOCAL_IDENTIFIER = 'sdktest'
    PROJECT_DIR = './'
  }
  stages {
    stage('Functional Test') {
      steps {
        script {
          if (env.BRANCH_NAME == 'dev') { 
            checkout scm

            docker.withTool('default') {
              withDockerServer([uri: 'tcp://localhost:2375']) {
                def testingImage = docker.build('sdk-test-image', './')

                testingImage.inside {
                  sh "node -v"
                  // setup_tunnel {
                  //   // TO DO: Actually execute the tests
                  //   sh "node -v"
                  // }
                }
              }
            }
          } else {
            sh " echo 'Skipping, Please try again on dev.'"
          }
        }
      }
    }
  }
}

def setup_tunnel(doTests) {
  
  // Download Browserstack local, unzip and make it executable, may still exist if many deployments fire at once
  if (!fileExists('/var/tmp/BrowserStackLocal')) {
    sh "curl https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip > /var/tmp/BrowserStackLocal.zip"
    sh "unzip -o /var/tmp/BrowserStackLocal.zip -d /var/tmp && chmod +x /var/tmp/BrowserStackLocal"
  }

  // Nohup the tunnel invocation so we can move on with the session, save pid in tmp for killing on success / fail
  sh "nohup /var/tmp/BrowserStackLocal \
    --key kqExpNPZDere7GszwkgL \
    --local-identifier ${env.LOCAL_IDENTIFIER} \
    --folder ${env.PROJECT_DIR} \
    > /var/tmp/browserstack.log 2>&1 & echo \$! > /var/tmp/browserstack.pid"

  try {
    doTests()
  } finally {
    // Kill browserstack local instance
    sh "kill `cat /var/tmp/browserstack.pid`"
  }
}