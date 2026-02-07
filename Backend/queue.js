// ---------- Priority Queue (Max Heap) ----------

class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    compare(a, b) {
        // higher priority first
        if (a.priority === b.priority) {
            // earlier arrival first
            return a.arrival < b.arrival;
        }
        return a.priority > b.priority;
    }

    push(item) {
        this.heap.push(item);
        this._heapifyUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;

        const top = this.heap[0];
        const last = this.heap.pop();

        if (this.heap.length > 0) {
            this.heap[0] = last;
            this._heapifyDown(0);
        }

        return top;
    }

    _heapifyUp(i) {
        while (i > 0) {
            const p = Math.floor((i - 1) / 2);

            if (this.compare(this.heap[i], this.heap[p])) {
                [this.heap[i], this.heap[p]] =
                    [this.heap[p], this.heap[i]];
                i = p;
            } else break;
        }
    }

    _heapifyDown(i) {
        const n = this.heap.length;

        while (true) {
            let best = i;
            const l = 2 * i + 1;
            const r = 2 * i + 2;

            if (l < n && this.compare(this.heap[l], this.heap[best]))
                best = l;

            if (r < n && this.compare(this.heap[r], this.heap[best]))
                best = r;

            if (best !== i) {
                [this.heap[i], this.heap[best]] =
                    [this.heap[best], this.heap[i]];
                i = best;
            } else break;
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}


// ---------- Service base weights ----------

const SERVICE_WEIGHT = {
    LOST_PASSPORT: 100,
    PASSPORT_RENEWAL: 85,
    VISA: 85,
    TERMINATION: 90,
    LEGAL: 80,
    DISTRESS: 90,
    CULTURAL: 40,
    EMPLOYMENT: 50,
    DOCUMENT: 60,
    CALAMITY: 90
};


// ---------- Priority calculation ----------

function calculatePriority(request) {

    // safety: unknown service
    const Ws = SERVICE_WEIGHT[request.service] ??0;

    let Wu = 0;
    let Wr = request.vulnerable ? 15 : 0;

    switch (request.service) {

        case "LOST_PASSPORT":
            if (request.flightHours <= 24) Wu += 60;
            else if (request.flightHours <= 72) Wu += 40;
            else Wu += 10;

            if (request.type === "TOURIST") Wu += 20;
            else Wu += 5;
            break;

        case "CULTURAL":
            if (request.imp === "HIGH PROFILE") Wu += 25;
            else if (request.imp === "COMMUNITY") Wu += 15;
            else Wu += 5;
            break;

        case "VISA":
            Wu += 30;
            break;

        case "PASSPORT_RENEWAL":
            if (request.daysToExpiry <= 7) Wu += 60;
            else if (request.daysToExpiry <= 30) Wu += 50;
            else Wu += 30;
            break;

        case "CALAMITY":
            if (request.severity === "HIGH") Wu += 60;
            else Wu += 50;
            break;

        case "LEGAL":
            if (request.hearingInDays <= 7) Wu += 40;
            else Wu += 30;
            break;

        case "EMPLOYMENT":
            Wu += 10;
            break;

        case "DISTRESS":
            Wu += 35;
            break;

        case "TERMINATION":
            Wu += 50;
            break;

        case "DOCUMENT":
            Wu += 20;
            break;

        default:
            break;
    }

    return Ws + Wu + Wr;
}


// ---------- Embassy Queue System ----------

class EmbassyQueueSystem {

    constructor() {
        this.pq = new PriorityQueue();
        this.arrivalCounter = 0;
        this.tokenCounter = 0;
    }

    addRequest(request) {

        const priority = calculatePriority(request);

        const person = {
            id: request.id,
            service: request.service,
            priority: priority,
            arrival: ++this.arrivalCounter
        };

        this.pq.push(person);

        return {
            receiptId: person.id,
            priority: priority
        };
    }

    serveNext() {

        if (this.pq.isEmpty()) return null;

        const p = this.pq.pop();

        const token = ++this.tokenCounter;

        return {
            token,
            personId: p.id,
            service: p.service,
            priority: p.priority
        };
    }
}
