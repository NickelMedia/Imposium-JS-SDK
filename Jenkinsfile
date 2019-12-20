runPipeline {
    projectName = "imposium-js-sdk-docs"
    useECR = true
    images = [
        [imageName: "imposium-js-sdk-docs"]
    ]
    k8s = [
        master: [
            name: "imposium-js-sdk-docs",
            namespace: "production",
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
                            requests:
                            [
                                cpu: "250m",
                                memory: "256Mi"
                            ],
                            limits:
                            [
                                cpu: "500m",
                                memory: "512Mi"
                            ]
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
                        hostName: "sdk-docs.imposium.com",
                        paths: [
                            [
                                servicePort: 3000
                            ]
                        ]
                    ]
                ]
            ]
        ],

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
                            requests:
                            [
                                cpu: "250m",
                                memory: "256Mi"
                            ],
                            limits:
                            [
                                cpu: "500m",
                                memory: "512Mi"
                            ]
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
                        hostName: "sdk-docs.staging.imposium.com",
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
