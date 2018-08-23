#!groovy

pipeline {
  agent any
  environment {
    LOCAL_IDENTIFIER = 'sdktest'
    BS_CREDS = credentials('browserstack-creds')
  }
  stages {
    stage('Functional Test') {
      steps {
        script {
          if (env.BRANCH_NAME == 'dev') { 
            checkout scm

            // Make sure the docker tools are setup correctly according to k8s jenkins host specs
            docker.withTool('default') {
              withDockerServer([uri: 'tcp://localhost:2375']) {
                def testingImage = docker.build('functionaltestcont', './')

                testingImage.inside {
                  // Ensure that running an npm install doesn't result in an EACCES error
                  withEnv(['npm_config_cache=npm-cache', 'HOME=.']) {
                    // Run npm i from jenkins as project isn't mounted in dockerfile workdir
                    sh "npm i"
                    sh "tslint -c 'tslint.json' './src/**/*.ts'"

                    // setup_tunnel {
                    //   sh "mocha ./tests/experience-browserstack.js --timeout 0"
                    // }
                  }
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
  sh "BUILD_ID=dontKillMe nohup /var/tmp/BrowserStackLocal \
    --key ${env.BS_CREDS_PSW} \
    --local-identifier ${env.LOCAL_IDENTIFIER} \
    --folder `pwd` \
    > /var/tmp/browserstack.log 2>&1 & echo \$! > /var/tmp/browserstack.pid"

  sh "sleep 10"

  try {
    doTests()
  } finally {
    // Kill browserstack local instance
    sh "kill `cat /var/tmp/browserstack.pid`"
  }
}