module M1 {
    // C1
    export class C1 {
    	public some = "";

        public node(): void{
            var a = "";
        }
    }
    export module M2 {
        // C2
        export class C2 {
        	public some = "";
        }
        module M3 {
            // C3
            class C3 {
            }
        }
    }
}

module M4.M5 {
    // C4
    class C4 {
    }
    module M6.M7 {
        // C6
        class C6 {
        }
        module M8.M9 {
            // C8
            class C8 {
            	public some = "";
            }
        }
    }
}

module M1.M2 {
    // C2
    export class C3 {
    	public some = "";
    }
    module M3 {
        // C3
        class C3 {
        }
    }
}

class glob {
    public fuck = "";
}