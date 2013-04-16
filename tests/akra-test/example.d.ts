module M1 {
    class C1 {
        public some: string;
        public node(): void;
    }
    module M2 {
        class C2 {
            public some: string;
        }
    }
}
module M4.M5 {
}
module M1.M2 {
    class C3 {
        public some: string;
    }
}
class glob {
    public fuck: string;
}
{
    "modules": {
        "M1": {
            "classes": {
                "C1": {
                    "variables": {
                        "some": {}
                    },
                    "functions": {
                        "node": {}
                    }
                }
            },
            "modules": {
                "M2": {
                    "classes": {
                        "C2": {
                            "variables": {
                                "some": {}
                            }
                        },
                        "C3": {
                            "variables": {
                                "some": {}
                            }
                        }
                    }
                }
            }
        },
        "M4": {
            "modules": {
                "M5": {}
            }
        }
    },
    "classes": {
        "glob": {
            "variables": {
                "fuck": {}
            }
        }
    },
    "variables": {},
    "functions": {}
}