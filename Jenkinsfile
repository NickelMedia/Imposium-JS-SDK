node {
  with_browser_stack 'linux-x64', {
    // Execute tests [...]
  }
}
// ----------------------------------------------
def with_browser_stack(type, actions) {
  // Prepare the BrowserStackLocal client
  if (! fileExists("/var/tmp/BrowserStackLocal")) {
    
    sh "curl -sS https://www.browserstack.com/browserstack-local/BrowserStackLocal-${type}.zip > /var/tmp/BrowserStackLocal.zip"
    sh "unzip -o /var/tmp/BrowserStackLocal.zip -d /var/tmp"
    sh "chmod +x /var/tmp/BrowserStackLocal"
  }
  // Start the connection
  sh "BUILD_ID=dontKillMe nohup /var/tmp/BrowserStackLocal --key DsVSdoJPBi2z44sbGFx1"
  sh "kill `cat /var/tmp/browserstack.pid`"
  // try {
  //   actions()
  // }
  // finally {
  //   // Stop the connection
  //   sh "kill `cat /var/tmp/browserstack.pid`"
  // }
}