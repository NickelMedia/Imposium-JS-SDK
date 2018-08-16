pipeline {
  agent any

  environment {
    LOCAL_IDENTIFIER = 'sdktest'
    PROJECT_DIR = './'
  }
  stages {
    stage('Functional Test') {
      steps {
        checkout scm

        with_browser_stack 'linux-x64', {
          // Execute tests [...]
          sh "ls -a"
          sh "pwd"
        }
      }
    }
  }
}

def with_browser_stack(type, doTests) {
  
  // Download Browserstack local, unzip and make it executable
  if (! fileExists("/var/tmp/BrowserStackLocal")) {
    sh "curl https://www.browserstack.com/browserstack-local/BrowserStackLocal-${type}.zip > /var/tmp/BrowserStackLocal.zip"
    sh "unzip -o /var/tmp/BrowserStackLocal.zip -d /var/tmp && chmod +x /var/tmp/BrowserStackLocal"
  }

  // Start the connection
  sh "BUILD_ID=dontKillMe nohup /var/tmp/BrowserStackLocal \
    --key kqExpNPZDere7GszwkgL \
    --local-identifier ${env.LOCAL_IDENTIFIER} \
    --folder ${env.PROJECT_DIR} \
    > /var/tmp/browserstack.log 2>&1 \
    & echo \$! > /var/tmp/browserstack.pid"

  try {
    doTests()
  } finally {
    // Stop the connection
    sh "kill `cat /var/tmp/browserstack.pid`"
  }
}