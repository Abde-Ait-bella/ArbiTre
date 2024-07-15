const scanner = require('sonarqube-scanner');


scanner(
    {
        serverUrl: 'http://localhost:9000',
        token: 'sqp_53891056069283f91a7bd40e1f6109068fb50606',
        options: {
            'sonar.projectName': 'Arbitre',
            'sonar.projectDescription': 'Arbitre web site frant-end',
            'sonar.projectKey': 'Arbitre',
            'sonar.projectVersion': '0.0.1',
            'sonar.exclusions': '',
            'sonar.sourceEncoding': 'UTF-8',
            'sonar.sources': './src',
        }
    },
    () => process.exit()
)