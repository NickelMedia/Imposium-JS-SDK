runPipeline {
    projectName = "imposium-js-sdk-docs"
    images = [
        [imageName: "imposium-js-sdk-docs"]
    ]
    k8s = [
        dev: [
            name: "imposium-js-sdk-docs",
            namespace: "staging",
            appLabel: "imposium-js-sdk-docs",

            deployment: [
                containers: [
                    [
                        name: "imposium-js-sdk-docs",
                        image: "imposium-js-sdk-docs",
                        ports: [
                            [
                                port: 3000,
                                protocol: "TCP"
                            ]
                        ],
                        resources: [
                            requests: [cpu: "250m", memory: "2Gi"],
                            limits: [cpu: "500m", memory: "4Gi"]
                        ]
                    ]
                ]
            ],

            service: [
                ports: [
                    [
                        name: "http",
                        port: "3000",
                        protocol: "TCP",
                        targetPort: "3000"
                    ]
                ]
            ],

            ingress: [
                hosts: [
                    [
                        hostName: "sdk-docs.dev.k8s.nickel.media",
                        paths: [
                            [
                                servicePort: 3000
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ]
}