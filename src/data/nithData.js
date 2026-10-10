export const DEPARTMENTS = [
  { id: 'all', name: 'All Departments', short: 'ALL' },
  { id: 'cse', name: 'Computer Science & Engineering', short: 'CSE', icon: '💻' },
  { id: 'ece', name: 'Electronics & Communication', short: 'ECE', icon: '📡' },
  { id: 'ee', name: 'Electrical Engineering', short: 'EE', icon: '⚡' },
  { id: 'me', name: 'Mechanical Engineering', short: 'ME', icon: '⚙️' },
  { id: 'ce', name: 'Civil Engineering', short: 'CE', icon: '🏗️' },
  { id: 'che', name: 'Chemical Engineering', short: 'CHE', icon: '🧪' },
  { id: 'mnc', name: 'Mathematics & Scientific Computing', short: 'MnC', icon: '📐' },
  { id: 'mse', name: 'Materials Science & Engineering', short: 'MSE', icon: '🔬' },
];

export const SEMESTERS = [
  { id: 'all', label: 'All Semesters' },
  { id: '1', label: '1st Sem' },
  { id: '2', label: '2nd Sem' },
  { id: '3', label: '3rd Sem' },
  { id: '4', label: '4th Sem' },
  { id: '5', label: '5th Sem' },
  { id: '6', label: '6th Sem' },
  { id: '7', label: '7th Sem' },
  { id: '8', label: '8th Sem' },
];

export const EXAM_TYPES = [
  { id: 'all', label: 'All Exams' },
  { id: 'mid', label: 'Mid-Term', badgeColor: 'bg-amber-100 text-amber-800 border-amber-200' },
  { id: 'end', label: 'End-Term', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
];

export const PAPERS_DATA = [
  {
    id: 'p-1',
    subject: 'Data Structures & Algorithms',
    code: 'CS-211',
    dept: 'cse',
    deptName: 'Computer Science & Engg.',
    semester: '3',
    examType: 'mid',
    year: '2024',
    maxMarks: 30,
    timeAllowed: '2 Hours',
    uploadedBy: 'Aman Sharma (CSE 22BCS041)',
    downloads: 1420,
    views: 3890,
    rating: 4.9,
    questions: [
      {
        id: 'q-p1-1',
        qNum: 'Q1',
        marks: 5,
        text: 'Explain the difference between singly linked list and doubly linked list. Write an algorithm to reverse a singly linked list in O(n) time and O(1) space.',
        unit: 'Unit 1: Linked Lists',
        solution: {
          summary: 'A Singly Linked List (SLL) stores only the next node pointer, requiring O(n) time for reverse traversal. A Doubly Linked List (DLL) contains both next and prev pointers allowing two-way navigation at the expense of extra memory overhead.',
          steps: [
            'Initialize three pointers: prev = NULL, curr = head, next = NULL.',
            'Iterate through the list while curr != NULL:',
            '  a) next = curr->next (save next node)',
            '  b) curr->next = prev (reverse current link)',
            '  c) prev = curr (move prev forward)',
            '  d) curr = next (move curr forward)',
            'Set head = prev upon loop termination.',
            'Complexity: Time O(n) visiting each node once, Space O(1) using only 3 pointers.'
          ],
          examTip: 'Always draw the node transition diagram with arrows reversing direction. This secures 100% of the working marks.'
        }
      },
      {
        id: 'q-p1-2',
        qNum: 'Q2',
        marks: 7,
        text: 'Construct an AVL tree by inserting the following keys sequentially: 45, 23, 67, 12, 34, 89, 56. Clearly illustrate the rotations (LL, RR, LR, RL) performed at each step.',
        unit: 'Unit 2: Balanced Search Trees',
        solution: {
          summary: 'An AVL tree is a self-balancing binary search tree where the balance factor BF = Height(Left) - Height(Right) is strictly in {-1, 0, +1}.',
          steps: [
            'Insert 45: Root created (BF = 0).',
            'Insert 23: Left child of 45 (BF = +1 at 45). Balanced.',
            'Insert 67: Right child of 45 (BF = 0 at 45). Balanced.',
            'Insert 12: Left of 23. Node 23 has BF = +1, 45 has BF = +1. Balanced.',
            'Insert 34: Right of 23. Node 23 becomes unbalanced with BF = -1 or +1? Trace: 23 has left child 12, right child 34. BF of 23 = 0. 45 has left height 2, right height 1. Balanced.',
            'Insert 89: Right child of 67. Node 67 has BF = -1. Balanced.',
            'Insert 56: Left child of 67. Node 45 now has left height 2, right height 3. Tree requires RL rotation at 67-56 or root.',
            'Final balanced root is 45 with balanced subtrees.'
          ],
          examTip: 'Calculate and write the BF next to every node after every single insertion step.'
        }
      },
      {
        id: 'q-p1-3',
        qNum: 'Q3',
        marks: 8,
        text: 'Explain QuickSort with the Lomuto and Hoare partitioning schemes. Derive the best, average, and worst-case time complexity with recurrence relations.',
        unit: 'Unit 3: Sorting & Searching',
        solution: {
          summary: 'QuickSort is a Divide-and-Conquer sorting algorithm choosing a pivot element and partitioning elements smaller to the left and larger to the right.',
          steps: [
            'Lomuto Scheme: Pivot chosen at end. Two pointers i and j scan linearly. Swaps happen whenever arr[j] <= pivot. Uses more swaps but simpler implementation.',
            'Hoare Scheme: Two pointers start from both ends and move inward until an inversion is found, then swap. Performs on average 3x fewer swaps than Lomuto.',
            'Best Case: Pivot splits array in halves: T(n) = 2T(n/2) + O(n) => By Master Theorem, T(n) = O(n log n).',
            'Worst Case: Array already sorted, unbalanced partition: T(n) = T(n-1) + O(n) => T(n) = O(n^2).',
            'Average Case: Random split yields T(n) = O(n log n).'
          ],
          examTip: 'Derive the recurrence using the recursion tree method to demonstrate full analytical depth.'
        }
      },
      {
        id: 'q-p1-4',
        qNum: 'Q4',
        marks: 10,
        text: 'Explain Dijkstra’s Single Source Shortest Path algorithm using a min-heap. Trace the algorithm on a 6-node weighted graph and state its time complexity.',
        unit: 'Unit 4: Graph Algorithms',
        solution: {
          summary: 'Dijkstra finds shortest path from source vertex to all other vertices in non-negative weighted graphs using greedy exploration with priority queue.',
          steps: [
            'Maintain dist[] initialized to infinity (dist[src] = 0) and min-priority queue pq.',
            'Extract vertex u with smallest dist[u] from pq.',
            'For every adjacent vertex v of u, relax edge (u, v): if dist[v] > dist[u] + weight(u, v), update dist[v] and push (dist[v], v) into pq.',
            'Repeat until pq is empty or all reachable vertices are visited.',
            'Time Complexity: O((V + E) log V) with binary heap.',
            'Limitation: Fails for graphs with negative weight cycles.'
          ],
          examTip: 'Highlight why negative edge weights cause Dijkstra greedy assumption to fail, prompting Bellman-Ford.'
        }
      }
    ]
  },
  {
    id: 'p-2',
    subject: 'Data Structures & Algorithms',
    code: 'CS-211',
    dept: 'cse',
    deptName: 'Computer Science & Engg.',
    semester: '3',
    examType: 'end',
    year: '2024',
    maxMarks: 50,
    timeAllowed: '3 Hours',
    uploadedBy: 'Priya Verma (CSE 21BCS019)',
    downloads: 2150,
    views: 5400,
    rating: 4.8,
    questions: [
      {
        id: 'q-p2-1',
        qNum: 'Q1',
        marks: 10,
        text: 'Compare BFS and DFS algorithms. Implement DFS using an explicit stack and detect if a directed graph contains a cycle.',
        unit: 'Unit 4: Graph Theory',
        solution: {
          summary: 'BFS explores neighbor-by-neighbor using a FIFO Queue (finds shortest unweighted path). DFS explores deeply along branches using a LIFO Stack or recursion.',
          steps: [
            'Cycle detection in directed graph requires 3 states: Unvisited (0), In-Progress/Recursion Stack (1), Completed (2).',
            'A cycle exists if a back-edge points to an ancestor node currently in the Recursion Stack (state 1).',
            'Explicit stack implementation pushes current vertex and tracks active branch path.',
            'Time Complexity: O(V + E), Space: O(V).'
          ],
          examTip: 'Explicitly explain why normal undirected visited[] array fails in directed graph cycle detection.'
        }
      },
      {
        id: 'q-p2-2',
        qNum: 'Q2',
        marks: 10,
        text: 'What is dynamic programming? Solve the 0/1 Knapsack problem using DP with step-by-step tabulation matrix for capacity W = 8.',
        unit: 'Unit 5: Advanced Algorithms',
        solution: {
          summary: 'Dynamic Programming is an optimization technique solving subproblems once and storing results (memoization/tabulation) satisfying Overlapping Subproblems and Optimal Substructure.',
          steps: [
            'Recurrence relation: DP[i][w] = DP[i-1][w] if wt[i] > w.',
            'Otherwise: DP[i][w] = max(DP[i-1][w], val[i] + DP[i-1][w - wt[i]]).',
            'Base condition: DP[0][w] = 0 and DP[i][0] = 0.',
            'Fill 2D table of size (N+1) x (W+1) row by row from top-left to bottom-right.',
            'Backtrack from DP[N][W] to identify chosen items.'
          ],
          examTip: 'Neatly draw the 2D grid with row labels (items) and column labels (weights 0 to 8).'
        }
      },
      {
        id: 'q-p2-3',
        qNum: 'Q3',
        marks: 10,
        text: 'Explain B-Tree of order m. Insert keys [10, 20, 30, 40, 50, 60, 70, 80] into a B-tree of order 4 and demonstrate node split.',
        unit: 'Unit 2: Advanced Trees',
        solution: {
          summary: 'A B-Tree of order m is a balanced multiway search tree where every internal node has at least ceil(m/2) children and at most m children. Keys in a node are kept sorted.',
          steps: [
            'For order 4: Max keys per node = m - 1 = 3 keys. Min keys = ceil(4/2) - 1 = 1 key.',
            'Insert 10, 20, 30: Node [10, 20, 30] is full.',
            'Insert 40: Node overflows [10, 20, 30, 40]. Median key 20 or 30 splits and ascends to new parent.',
            'Left child receives lower keys, right child receives upper keys.',
            'Repeat insertions with subsequent splits pushing median elements upwards.'
          ],
          examTip: 'Label the median key that moves up to the parent clearly at each split.'
        }
      },
      {
        id: 'q-p2-4',
        qNum: 'Q4',
        marks: 10,
        text: 'Discuss collision resolution techniques in Hashing: Separate Chaining vs Open Addressing (Linear Probing, Quadratic, Double Hashing).',
        unit: 'Unit 3: Hashing',
        solution: {
          summary: 'Collision occurs when two distinct keys hash to the same bucket index h(k1) == h(k2).',
          steps: [
            'Separate Chaining: Each bucket holds a linked list. Never runs out of space; load factor alpha can exceed 1.',
            'Open Addressing: All elements stored directly in the hash table. Load factor must remain < 1.',
            'Linear Probing: h(k, i) = (h(k) + i) mod m. Suffers from Primary Clustering.',
            'Quadratic Probing: h(k, i) = (h(k) + c1*i + c2*i^2) mod m. Reduces primary clustering but has secondary clustering.',
            'Double Hashing: h(k, i) = (h1(k) + i*h2(k)) mod m. Best distribution; eliminates clustering.'
          ],
          examTip: 'State the formulas for each probing method and write a clear comparative tabular column.'
        }
      },
      {
        id: 'q-p2-5',
        qNum: 'Q5',
        marks: 10,
        text: 'Implement Floyd-Warshall All-Pairs Shortest Path algorithm and show the distance matrix calculation.',
        unit: 'Unit 4: Graphs',
        solution: {
          summary: 'Floyd-Warshall computes shortest distances between all pairs of vertices in O(V^3) time using DP, handling negative edges provided no negative cycle exists.',
          steps: [
            'Initialize distance matrix D[0] with direct edge weights and 0 on diagonal.',
            'Run 3 nested loops: for intermediate k = 1 to V, for source i = 1 to V, for destination j = 1 to V.',
            'Update: D[k][i][j] = min(D[k-1][i][j], D[k-1][i][k] + D[k-1][k][j]).',
            'If diagonal element D[k][i][i] becomes negative, graph contains a negative cycle.'
          ],
          examTip: 'Show step-by-step transformation matrices D^(0), D^(1), and final D^(V).'
        }
      }
    ]
  },
  {
    id: 'p-3',
    subject: 'Operating Systems',
    code: 'CS-311',
    dept: 'cse',
    deptName: 'Computer Science & Engg.',
    semester: '5',
    examType: 'mid',
    year: '2024',
    maxMarks: 30,
    timeAllowed: '2 Hours',
    uploadedBy: 'Rohit Thakur (CSE 21BCS088)',
    downloads: 980,
    views: 2950,
    rating: 4.9,
    questions: [
      {
        id: 'q-p3-1',
        qNum: 'Q1',
        marks: 8,
        text: 'Explain the Banker’s Algorithm for deadlock avoidance with safety and resource request algorithms. Trace with a 5 process, 3 resource example.',
        unit: 'Unit 3: Deadlocks',
        solution: {
          summary: 'Banker’s Algorithm tests safety by simulating the allocation of predetermined maximum possible amounts of all resources before granting requests.',
          steps: [
            'Vectors and Matrices: Available[m], Max[n][m], Allocation[n][m], Need[n][m] where Need = Max - Allocation.',
            'Safety Algorithm: Initialize Work = Available, Finish[i] = false for all processes.',
            'Find index i such that Finish[i] == false and Need[i] <= Work.',
            'If found: Work = Work + Allocation[i], Finish[i] = true. Repeat.',
            'If all Finish[i] == true, system is in SAFE STATE and sequence is valid.'
          ],
          examTip: 'Draw the full tabular Need matrix first, then write the safe sequence clearly (e.g. <P1, P3, P0, P2, P4>).'
        }
      },
      {
        id: 'q-p3-2',
        qNum: 'Q2',
        marks: 7,
        text: 'Solve the classical Readers-Writers problem using counting semaphores ensuring no starvation for readers.',
        unit: 'Unit 2: Process Synchronization',
        solution: {
          summary: 'Readers-Writers problem coordinates concurrent database access where multiple readers can read simultaneously but writers require exclusive access.',
          steps: [
            'Semaphores used: mutex = 1 (protects read_count), rw_mutex = 1 (protects shared resource), read_count = 0.',
            'Reader entry: wait(mutex); read_count++; if (read_count == 1) wait(rw_mutex); signal(mutex).',
            'Reader exit: wait(mutex); read_count--; if (read_count == 0) signal(rw_mutex); signal(mutex).',
            'Writer: wait(rw_mutex); /* write */; signal(rw_mutex).'
          ],
          examTip: 'Mention that the first reader locks the resource and the last reader releases it.'
        }
      },
      {
        id: 'q-p3-3',
        qNum: 'Q3',
        marks: 7,
        text: 'Compare CPU scheduling algorithms: Round Robin (Time quantum = 2ms) vs Shortest Remaining Time First (SRTF) on given arrival and burst times.',
        unit: 'Unit 1: Process Management',
        solution: {
          summary: 'Round Robin is preemptive based on fixed time slice ensuring responsiveness. SRTF is the preemptive version of SJF minimizing average waiting time.',
          steps: [
            'Draw Gantt charts for both algorithms.',
            'Round Robin: Process runs for quantum or until completion, then context switches to tail of ready queue.',
            'SRTF: At every arrival or completion, scheduler picks process with smallest remaining burst time.',
            'Calculate Turnaround Time (TAT = Completion - Arrival) and Waiting Time (WT = TAT - Burst).',
            'Average WT for SRTF is optimal, while RR provides fairness and no starvation.'
          ],
          examTip: 'Always construct the Gantt chart with time stamps at the bottom.'
        }
      },
      {
        id: 'q-p3-4',
        qNum: 'Q4',
        marks: 8,
        text: 'Explain Virtual Memory management. Compare FIFO, LRU, and Optimal page replacement algorithms on string: 7 0 1 2 0 3 0 4 2 3 0 3 2 for 3 frames.',
        unit: 'Unit 4: Memory Management',
        solution: {
          summary: 'Virtual memory decouples logical memory from physical RAM using paging and swapping, invoking page replacement when all physical frames are occupied.',
          steps: [
            'Draw a 3-row grid tracking frame contents at each page request.',
            'FIFO: Replaces the oldest loaded page. Vulnerable to Belady\'s Anomaly.',
            'LRU: Replaces page not referenced for longest elapsed time in past.',
            'Optimal: Replaces page that will not be used for longest future duration (theoretical benchmark).',
            'Count page faults: Mark Hit (H) vs Fault (F) in the bottom row.'
          ],
          examTip: 'Show total page faults count at the end of each trace table for comparison.'
        }
      }
    ]
  },
  {
    id: 'p-4',
    subject: 'Operating Systems',
    code: 'CS-311',
    dept: 'cse',
    deptName: 'Computer Science & Engg.',
    semester: '5',
    examType: 'end',
    year: '2023',
    maxMarks: 50,
    timeAllowed: '3 Hours',
    uploadedBy: 'Sahil Kapoor (CSE 20BCS012)',
    downloads: 1840,
    views: 4320,
    rating: 4.7,
    questions: [
      {
        id: 'q-p4-1',
        qNum: 'Q1',
        marks: 10,
        text: 'Explain paging and segmentation with TLB architecture and calculate effective memory access time.',
        unit: 'Unit 4: Memory Architecture',
        solution: {
          summary: 'Paging divides memory into fixed-sized blocks (frames/pages). Translation Lookaside Buffer (TLB) caches recent translations to accelerate address resolution.',
          steps: [
            'Logical address: Page Number (p) + Page Offset (d).',
            'TLB hit: Frame number retrieved in 1 TLB access time (t_tlb).',
            'TLB miss: Access page table in main memory (t_mem), load into TLB.',
            'Effective Access Time EAT = Hit_Rate * (t_tlb + t_mem) + (1 - Hit_Rate) * (t_tlb + 2*t_mem).'
          ],
          examTip: 'Draw the diagram connecting CPU, TLB, Page Table, and Physical Memory.'
        }
      },
      {
        id: 'q-p4-2',
        qNum: 'Q2',
        marks: 10,
        text: 'Explain Peterson’s solution for mutual exclusion in two-process synchronization and why memory barriers are required in modern CPUs.',
        unit: 'Unit 2: Synchronization',
        solution: {
          summary: 'Peterson\'s solution is a classic software-based critical section protocol for two processes satisfying Mutual Exclusion, Progress, and Bounded Waiting.',
          steps: [
            'Shared variables: boolean flag[2] = {false, false}; int turn;',
            'Process Pi entry: flag[i] = true; turn = j; while (flag[j] && turn == j); /* busy wait */',
            'Critical section execution.',
            'Process Pi exit: flag[i] = false;',
            'Modern CPUs reorder instructions for performance; memory barriers (fences) prevent out-of-order execution that would violate safety.'
          ],
          examTip: 'Prove all three criteria: Mutual Exclusion, Progress, and Bounded Waiting separately.'
        }
      },
      {
        id: 'q-p4-3',
        qNum: 'Q3',
        marks: 10,
        text: 'Disk Scheduling Algorithms: Calculate total head movements for FCFS, SSTF, SCAN, and C-LOOK for queue: 98, 183, 37, 122, 14, 124, 65, 67.',
        unit: 'Unit 5: I/O & Storage',
        solution: {
          summary: 'Disk scheduling algorithms minimize seek time (head movement across magnetic cylinders).',
          steps: [
            'Initial head position: Assume cylinder 53.',
            'FCFS: Processes requests in exact arrival order. Head travel = |53-98| + |98-183| + ...',
            'SSTF: Selects request with shortest seek time from current position (may cause starvation for distant requests).',
            'SCAN: Moves head in one direction servicing requests until boundary, then reverses.',
            'C-LOOK: Moves towards highest request, then jumps back to lowest pending request without reaching physical disk ends.'
          ],
          examTip: 'Draw the cylinder horizontal axis and trace the head path with arrows.'
        }
      },
      {
        id: 'q-p4-4',
        qNum: 'Q4',
        marks: 10,
        text: 'Describe UNIX Inode file system architecture and directory structures with linked allocation vs indexed allocation.',
        unit: 'Unit 5: File Systems',
        solution: {
          summary: 'An inode (index node) stores file metadata and pointers to data blocks on disk.',
          steps: [
            'Inode structure: Mode, Owner, File Size, Timestamps, and 15 Block Pointers.',
            '12 Direct Pointers point directly to file data blocks.',
            '1 Single Indirect Pointer points to a block of direct pointers.',
            '1 Double Indirect Pointer and 1 Triple Indirect Pointer support massive file sizes.',
            'Comparison: Linked allocation has no external fragmentation but slow random access; Indexed allocation provides fast direct access.'
          ],
          examTip: 'Draw the pointer hierarchy tree from inode to data blocks.'
        }
      },
      {
        id: 'q-p4-5',
        qNum: 'Q5',
        marks: 10,
        text: 'Explain Dining Philosophers problem and provide a deadlock-free solution using Monitor or Semaphores.',
        unit: 'Unit 2: Synchronization',
        solution: {
          summary: '5 philosophers sit around a table alternating between thinking and eating with 5 chopsticks, illustrating resource deadlock.',
          steps: [
            'Deadlock condition: If every philosopher picks up left chopstick simultaneously, circular wait occurs.',
            'Deadlock-free Solution: (1) Allow at most 4 philosophers to sit, OR (2) An odd philosopher picks left first, even picks right first, OR (3) Use monitor state array {THINKING, HUNGRY, EATING}.',
            'State array solution checks if left and right neighbors are not eating before changing state to EATING.'
          ],
          examTip: 'Write the test(i) function logic using semaphores or monitors.'
        }
      }
    ]
  },
  {
    id: 'p-5',
    subject: 'Analog Electronics',
    code: 'EC-212',
    dept: 'ece',
    deptName: 'Electronics & Communication',
    semester: '3',
    examType: 'mid',
    year: '2024',
    maxMarks: 30,
    timeAllowed: '2 Hours',
    uploadedBy: 'Ananya Dogra (ECE 22BEC055)',
    downloads: 870,
    views: 2210,
    rating: 4.8,
    questions: [
      {
        id: 'q-p5-1',
        qNum: 'Q1',
        marks: 7,
        text: 'Draw the small-signal hybrid-pi model of BJT. Derive expressions for input impedance, output impedance, and voltage gain of a Common Emitter amplifier.',
        unit: 'Unit 1: BJT Small Signal',
        solution: {
          summary: 'The hybrid-pi model linearizes BJT around its DC quiescent operating point for AC small-signal frequency analysis.',
          steps: [
            'Parameters: r_pi = beta / gm, transconductance gm = Ic / Vt, output resistance ro = Va / Ic.',
            'Input impedance: Zin = R1 || R2 || r_pi.',
            'Output impedance: Zout = Rc || ro.',
            'Voltage gain: Av = Vo / Vi = -gm * (Rc || RL || ro). The negative sign denotes 180 degree phase inversion.'
          ],
          examTip: 'Draw the AC equivalent circuit with DC voltage sources replaced by ground.'
        }
      },
      {
        id: 'q-p5-2',
        qNum: 'Q2',
        marks: 8,
        text: 'Design a high input impedance OP-AMP instrumentation amplifier. Derive the expression for CMRR and overall voltage gain.',
        unit: 'Unit 2: Operational Amplifiers',
        solution: {
          summary: 'A 3-OPAMP instrumentation amplifier offers very high input impedance, high CMRR, and adjustable gain via a single resistor Rg.',
          steps: [
            'First stage: Two non-inverting buffers with common gain resistor Rg.',
            'Differential output of first stage: (Vo1 - Vo2) = (1 + 2*R1/Rg) * (V1 - V2).',
            'Second stage: Difference amplifier with gain R3 / R2.',
            'Overall differential gain Ad = (1 + 2*R1/Rg) * (R3/R2).',
            'Common Mode Gain Ac = 0 for perfectly matched resistors, yielding ideal infinite CMRR.'
          ],
          examTip: 'Highlight the role of Rg in adjusting gain without needing matched potentiometer pairs.'
        }
      },
      {
        id: 'q-p5-3',
        qNum: 'Q3',
        marks: 7,
        text: 'Explain Barkhausen criterion for sustained oscillations. Derive the frequency of oscillation and gain requirement for a Wien Bridge Oscillator.',
        unit: 'Unit 3: Feedback & Oscillators',
        solution: {
          summary: 'Barkhausen Criterion requires: |A * beta| = 1 and phase shift around feedback loop = 0 or 360 degrees.',
          steps: [
            'Wien Bridge feedback factor beta = 1 / (3 + j(omega*RC - 1/(omega*RC))).',
            'For zero phase shift, imaginary term = 0: omega*RC = 1/(omega*RC) => f = 1 / (2*pi*R*C).',
            'At this frequency, beta = 1/3.',
            'To satisfy |A * beta| >= 1, amplifier non-inverting gain A = 1 + Rf/R1 >= 3, hence Rf >= 2*R1.'
          ],
          examTip: 'Draw the RC series-parallel lead-lag circuit alongside the non-inverting OP-AMP.'
        }
      },
      {
        id: 'q-p5-4',
        qNum: 'Q4',
        marks: 8,
        text: 'Discuss thermal runaway in BJT and derive the stability factor S(Ico) for voltage divider bias circuit.',
        unit: 'Unit 1: Transistor Biasing',
        solution: {
          summary: 'Thermal runaway is the self-destructive spiral where temperature increase boosts collector current Ic, which increases power dissipation and further raises junction temperature.',
          steps: [
            'Stability factor S = d(Ic) / d(Ico).',
            'For voltage divider bias: Vth = Rth * Ib + Vbe + (Ib + Ic) * Re.',
            'Differentiating with respect to Ic yields S = (1 + beta) / (1 + beta * (Re / (Rth + Re))).',
            'If Re >> Rth, S approaches 1, providing optimal thermal stability.'
          ],
          examTip: 'Emphasize why voltage divider bias is the most widely adopted BJT biasing technique.'
        }
      }
    ]
  }
];

export const MOST_REPEATED_PYQS = [
  {
    id: 'rep-1',
    subject: 'Data Structures & Algorithms',
    code: 'CS-211',
    dept: 'cse',
    semester: '3',
    question: 'Construct an AVL tree and explain LL, RR, LR, RL rotations with clear balancing equations.',
    repeatCount: 6,
    yearsRepeated: ['End 2019', 'Mid 2021', 'End 2022', 'Mid 2023', 'End 2023', 'Mid 2024'],
    marksWeightage: '7 - 10 Marks',
    unit: 'Unit 2: Balanced Search Trees',
    difficulty: 'Medium',
    importance: 'Must-Do (100% Probability)',
    solutionSummary: 'AVL is a self-balancing BST where height difference of left and right subtree (Balance Factor = hL - hR) is in {-1, 0, +1}. Single rotations (LL, RR) fix simple unbalances; double rotations (LR, RL) fix zigzag unbalances. Time complexity for insert/delete is O(log n).',
    keyPoints: [
      'Balance Factor = Height(Left) - Height(Right)',
      'LL rotation: Right rotate unbalanced node',
      'RR rotation: Left rotate unbalanced node',
      'LR rotation: Left rotate left child, then Right rotate node',
      'RL rotation: Right rotate right child, then Left rotate node'
    ],
    nithTip: 'Professors at NITH frequently give a list of 7 numbers (like 10, 20, 30, 40, 50, 25) and ask for the final tree structure with each rotation highlighted.'
  },
  {
    id: 'rep-2',
    subject: 'Operating Systems',
    code: 'CS-311',
    dept: 'cse',
    semester: '5',
    question: 'Explain Banker’s Algorithm for Deadlock Avoidance. Trace safety algorithm and calculate safe sequence.',
    repeatCount: 5,
    yearsRepeated: ['End 2020', 'Mid 2021', 'End 2022', 'Mid 2023', 'Mid 2024'],
    marksWeightage: '8 - 10 Marks',
    unit: 'Unit 3: Deadlocks',
    difficulty: 'Easy-Medium',
    importance: 'Super High Yield',
    solutionSummary: 'Uses Need = Max - Allocation. If Need <= Work, process finishes and releases resources (Work = Work + Allocation). If all processes finish, state is SAFE; otherwise unsafe (potential deadlock).',
    keyPoints: [
      'Data structures: Available[m], Max[n][m], Allocation[n][m], Need[n][m]',
      'Step 1: Calculate Need matrix = Max - Allocation',
      'Step 2: Initialize Work = Available, Finish[i] = false',
      'Step 3: Find i such that Finish[i] == false and Need[i] <= Work',
      'Step 4: Output sequence <P1, P3, P0, P2, P4>'
    ],
    nithTip: 'Guaranteed 8-10 marks in OS Mid-Term or End-Term. Always draw the Need matrix neatly in tabular format first.'
  },
  {
    id: 'rep-3',
    subject: 'Database Management Systems',
    code: 'CS-221',
    dept: 'cse',
    semester: '4',
    question: 'Compare 3NF and BCNF. Given relation R and functional dependencies, test for BCNF and perform lossless decomposition.',
    repeatCount: 5,
    yearsRepeated: ['Mid 2019', 'End 2020', 'End 2021', 'Mid 2023', 'End 2024'],
    marksWeightage: '8 - 10 Marks',
    unit: 'Unit 2: Normalization',
    difficulty: 'Hard',
    importance: 'Core Concept',
    solutionSummary: 'A relation is in BCNF if for every functional dependency X -> Y, X is a superkey. 3NF allows Y to be a prime attribute (part of candidate key). BCNF is stricter and may not preserve dependencies, whereas 3NF always preserves both lossless join and dependencies.',
    keyPoints: [
      'Candidate key identification using attribute closure X+',
      '3NF condition: X is superkey OR Y is prime attribute',
      'BCNF condition: X MUST be superkey',
      'Decomposition into R1(X, Y) and R2(R - Y + X)'
    ],
    nithTip: 'Watch out for dependency preservation check! NITH papers almost always ask whether the BCNF decomposition preserved all dependencies.'
  },
  {
    id: 'rep-4',
    subject: 'Analog Electronics',
    code: 'EC-212',
    dept: 'ece',
    semester: '3',
    question: 'Derive Barkhausen criterion for oscillators. Find expression for frequency and condition for oscillation of Wien Bridge Oscillator.',
    repeatCount: 6,
    yearsRepeated: ['End 2018', 'End 2019', 'Mid 2021', 'End 2022', 'End 2023', 'Mid 2024'],
    marksWeightage: '7 - 10 Marks',
    unit: 'Unit 3: Oscillators',
    difficulty: 'Medium',
    importance: 'ECE Evergreen Question',
    solutionSummary: 'Barkhausen Criterion states: (1) Loop gain |A*beta| = 1, (2) Total phase shift around loop must be 0 or 360 degrees. For Wien Bridge, beta = 1 / (3 + j(omega*RC - 1/(omega*RC))). At resonance, imaginary part = 0, giving f = 1 / (2*pi*R*C) and Av >= 3 (Rf/R1 >= 2).',
    keyPoints: [
      'Loop gain condition: |Aβ| ≥ 1',
      'Phase condition: ∠Aβ = 0° or 360°',
      'Frequency formula: f = 1 / (2πRC)',
      'Minimum amplifier gain: A = 1 + Rf/R1 = 3 => Rf = 2*R1'
    ],
    nithTip: 'Draw both the operational amplifier and the RC bridge network with clear terminal markings (+ and - input).'
  }
];

export const EXPECTED_PYQS_PREDICTOR = [
  {
    id: 'exp-1',
    subject: 'Data Structures & Algorithms',
    code: 'CS-211',
    dept: 'cse',
    semester: '3',
    topic: 'Dynamic Programming / Graphs',
    predictedQuestion: 'Explain Dijkstra’s Single Source Shortest Path vs Bellman-Ford. Why does Dijkstra fail for negative edge weights? Trace Bellman-Ford algorithm for negative weight cycle detection.',
    probability: 96,
    marksExpected: '8 - 10 Marks',
    targetExam: 'Upcoming Mid-Term & End-Term',
    whyExpected: 'Bellman-Ford was skipped in 2024 end-term paper. At NITH, Dijkstra and Bellman-Ford rotate alternate years. High probability of cycle detection derivation.',
    keyFormulas: [
      'Relaxation step: if dist[v] > dist[u] + weight(u, v) then dist[v] = dist[u] + weight(u, v)',
      'Bellman-Ford runs (V - 1) times; V-th iteration detects negative cycle',
      'Time complexity: O(V * E) vs Dijkstra O((V + E) log V)'
    ],
    quickPrepChecklist: [
      'Negative weight counter-example diagram',
      'Step-by-step trace table with vertex array',
      'Proof of correctness: why V - 1 relaxations suffice'
    ]
  },
  {
    id: 'exp-2',
    subject: 'Operating Systems',
    code: 'CS-311',
    dept: 'cse',
    semester: '5',
    topic: 'Memory Management / Virtual Memory',
    predictedQuestion: 'Given reference string and 3/4 page frames, calculate page faults for FIFO, LRU, and Optimal replacement algorithms. Explain Belady’s anomaly with a concrete 12-page reference string.',
    probability: 94,
    marksExpected: '8 - 10 Marks',
    targetExam: 'Upcoming Mid-Term',
    whyExpected: 'Tested in 4 out of last 5 NITH OS papers. Belady anomaly question is a recurring favorite of the NITH CSE faculty.',
    keyFormulas: [
      'Belady’s anomaly string example: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5',
      'With 3 frames: 9 page faults; With 4 frames: 10 page faults (Faults increase!)',
      'Optimal algorithm: Replace page that will not be used for longest future duration'
    ],
    quickPrepChecklist: [
      'Draw 3-row grid for each algorithm',
      'Highlight Hit (H) vs Fault (F) clearly',
      'Explain stack property of LRU (LRU does not suffer Belady anomaly)'
    ]
  },
  {
    id: 'exp-3',
    subject: 'Analog Electronics',
    code: 'EC-212',
    dept: 'ece',
    semester: '3',
    topic: 'Operational Amplifiers & Applications',
    predictedQuestion: 'Draw circuit of 3-OPAMP Instrumentation Amplifier. Derive expression for differential gain and prove that CMRR is extremely high. Explain role of gain-setting resistor Rg.',
    probability: 92,
    marksExpected: '8 Marks',
    targetExam: 'Upcoming Mid-Term',
    whyExpected: 'Instrumentation amplifiers are in Unit 2 compulsory syllabus and usually form question Q2 in Mid-Terms.',
    keyFormulas: [
      'Stage 1 output: (Vo1 - Vo2) = (1 + 2*R1 / Rg) * (V1 - V2)',
      'Stage 2 output: Vo = (R3 / R2) * (Vo1 - Vo2)',
      'Overall differential gain Ad = (1 + 2*R1 / Rg) * (R3 / R2)'
    ],
    quickPrepChecklist: [
      'Draw buffer stage with OP1 and OP2',
      'Draw difference stage with OP3 and bridge resistors',
      'Calculate Common-Mode Gain Ac = 0 for matched resistors'
    ]
  }
];

// Semester subjects curriculum mapping for NIT Hamirpur
export const SEMESTER_CURRICULUM = {
  '3': {
    cse: [
      {
        id: 'sub-cs-211',
        code: 'CS-211',
        name: 'Data Structures & Algorithms',
        credits: 4,
        units: [
          { id: 'u1', name: 'Unit 1: Arrays, Linked Lists & Stacks', completed: true },
          { id: 'u2', name: 'Unit 2: Trees, AVL & Heaps', completed: true },
          { id: 'u3', name: 'Unit 3: Sorting, Searching & Hashing', completed: false },
          { id: 'u4', name: 'Unit 4: Graph Algorithms & Traversals', completed: false },
          { id: 'u5', name: 'Unit 5: DP & Greedy Techniques', completed: false }
        ]
      },
      {
        id: 'sub-cs-212',
        code: 'CS-212',
        name: 'Digital Logic & Circuit Design',
        credits: 4,
        units: [
          { id: 'u1', name: 'Unit 1: Boolean Algebra & K-Maps', completed: true },
          { id: 'u2', name: 'Unit 2: Combinational Logic Circuits', completed: true },
          { id: 'u3', name: 'Unit 3: Flip Flops & Sequential Design', completed: true },
          { id: 'u4', name: 'Unit 4: Registers & Synchronous Counters', completed: false },
          { id: 'u5', name: 'Unit 5: Logic Families & Memory', completed: false }
        ]
      },
      {
        id: 'sub-ma-211',
        code: 'MA-211',
        name: 'Discrete Mathematics',
        credits: 4,
        units: [
          { id: 'u1', name: 'Unit 1: Set Theory, Relations & Functions', completed: true },
          { id: 'u2', name: 'Unit 2: Propositional & Predicate Logic', completed: true },
          { id: 'u3', name: 'Unit 3: Algebraic Structures & Groups', completed: false },
          { id: 'u4', name: 'Unit 4: Combinatorics & Recurrences', completed: false },
          { id: 'u5', name: 'Unit 5: Graph Theory Fundamentals', completed: false }
        ]
      },
      {
        id: 'sub-cs-213',
        code: 'CS-213',
        name: 'Object Oriented Programming (C++/Java)',
        credits: 3,
        units: [
          { id: 'u1', name: 'Unit 1: OOP Principles & Classes', completed: true },
          { id: 'u2', name: 'Unit 2: Inheritance & Polymorphism', completed: true },
          { id: 'u3', name: 'Unit 3: Templates, Generics & STL', completed: true },
          { id: 'u4', name: 'Unit 4: Exception Handling & File I/O', completed: false },
          { id: 'u5', name: 'Unit 5: Design Patterns Basics', completed: false }
        ]
      }
    ],
    ece: [
      {
        id: 'sub-ec-212',
        code: 'EC-212',
        name: 'Analog Electronics',
        credits: 4,
        units: [
          { id: 'u1', name: 'Unit 1: BJT Small Signal Models', completed: true },
          { id: 'u2', name: 'Unit 2: OP-AMP Applications & CMRR', completed: true },
          { id: 'u3', name: 'Unit 3: Feedback & Oscillators', completed: false },
          { id: 'u4', name: 'Unit 4: Power Amplifiers', completed: false },
          { id: 'u5', name: 'Unit 5: Active Filters', completed: false }
        ]
      },
      {
        id: 'sub-ec-211',
        code: 'EC-211',
        name: 'Signals & Systems',
        credits: 4,
        units: [
          { id: 'u1', name: 'Unit 1: Continuous & Discrete Signals', completed: true },
          { id: 'u2', name: 'Unit 2: LTI Systems & Convolution', completed: true },
          { id: 'u3', name: 'Unit 3: Fourier Series & Transform', completed: false },
          { id: 'u4', name: 'Unit 4: Laplace & Z-Transform', completed: false },
          { id: 'u5', name: 'Unit 5: Sampling Theorem', completed: false }
        ]
      }
    ]
  },
  '5': {
    cse: [
      {
        id: 'sub-cs-311',
        code: 'CS-311',
        name: 'Operating Systems',
        credits: 4,
        units: [
          { id: 'u1', name: 'Unit 1: Process Management & CPU Scheduling', completed: true },
          { id: 'u2', name: 'Unit 2: Synchronization & Concurrency', completed: true },
          { id: 'u3', name: 'Unit 3: Deadlocks & Banker Algorithm', completed: true },
          { id: 'u4', name: 'Unit 4: Virtual Memory & Page Replacement', completed: false },
          { id: 'u5', name: 'Unit 5: File Systems & Disk Scheduling', completed: false }
        ]
      },
      {
        id: 'sub-cs-312',
        code: 'CS-312',
        name: 'Computer Networks',
        credits: 4,
        units: [
          { id: 'u1', name: 'Unit 1: OSI & TCP/IP Model', completed: true },
          { id: 'u2', name: 'Unit 2: Data Link Layer & Framing', completed: true },
          { id: 'u3', name: 'Unit 3: Network Layer & Routing Protocols', completed: false },
          { id: 'u4', name: 'Unit 4: Transport Layer (TCP/UDP)', completed: false },
          { id: 'u5', name: 'Unit 5: Application Protocols & Security', completed: false }
        ]
      },
      {
        id: 'sub-cs-313',
        code: 'CS-313',
        name: 'Theory of Computation',
        credits: 4,
        units: [
          { id: 'u1', name: 'Unit 1: Finite Automata (DFA/NFA)', completed: true },
          { id: 'u2', name: 'Unit 2: Regular Expressions & Pumping Lemma', completed: true },
          { id: 'u3', name: 'Unit 3: Context-Free Grammars & PDA', completed: false },
          { id: 'u4', name: 'Unit 4: Turing Machines & Halting Problem', completed: false },
          { id: 'u5', name: 'Unit 5: Chomsky Hierarchy & Decidability', completed: false }
        ]
      }
    ]
  }
};

// Default pre-populated mistakes journal entries for testing
export const INITIAL_MISTAKES = [
  {
    id: 'mst-1',
    subject: 'Data Structures & Algorithms',
    code: 'CS-211',
    examTag: 'Mid-Term 2024',
    question: 'Write an algorithm to reverse a singly linked list in O(n) time and O(1) space.',
    mistakeMade: 'Forgot to update head pointer at the end of the loop, left head dangling at the original first node which caused NullPointer exception in traversal.',
    correctConcept: 'Always remember to set `head = prev` after the `while (curr != NULL)` loop terminates.',
    status: 'revised',
    date: 'Oct 8, 2024'
  },
  {
    id: 'mst-2',
    subject: 'Operating Systems',
    code: 'CS-311',
    examTag: 'Class Test 1',
    question: 'Calculate Safe Sequence using Banker’s Algorithm for given Need and Available vectors.',
    mistakeMade: 'Subtracted Allocation from Max instead of calculating Need = Max - Allocation, and forgot to return released resources to Work vector.',
    correctConcept: 'When process finishes, Work = Work + Allocation[i] (NOT Max). Double check available resource additions.',
    status: 'needs_practice',
    date: 'Oct 9, 2024'
  },
  {
    id: 'mst-3',
    subject: 'Analog Electronics',
    code: 'EC-212',
    examTag: 'Mid-Term 2024',
    question: 'Derive frequency of oscillation and condition for Wien Bridge Oscillator.',
    mistakeMade: 'Confused the minimum gain requirement; wrote Rf/R1 = 3 instead of Rf/R1 >= 2 (Total non-inverting gain A = 1 + Rf/R1 = 3).',
    correctConcept: 'Loop gain |Aβ| = 1 implies A = 3. Since A = 1 + Rf/R1, Rf = 2 * R1.',
    status: 'needs_practice',
    date: 'Oct 10, 2024'
  }
];

export const INITIAL_QUESTION_BOOKMARKS = [
  {
    id: 'bm-q1',
    source: 'Mid-Term 2024 • CS-211',
    subject: 'Data Structures & Algorithms',
    code: 'CS-211',
    marks: 7,
    unit: 'Unit 2: Balanced Search Trees',
    question: 'Construct an AVL tree by inserting the following keys sequentially: 45, 23, 67, 12, 34, 89, 56. Clearly illustrate the rotations (LL, RR, LR, RL) performed at each step.',
    solutionSummary: 'Calculate Balance Factor BF = hL - hR after each insert. Perform single rotation (LL or RR) for linear unbalance and double rotation (LR or RL) for zigzag unbalance.'
  },
  {
    id: 'bm-q2',
    source: 'End-Term 2024 • CS-211',
    subject: 'Data Structures & Algorithms',
    code: 'CS-211',
    marks: 10,
    unit: 'Unit 5: Advanced Algorithms',
    question: 'What is dynamic programming? Solve the 0/1 Knapsack problem using DP with step-by-step tabulation matrix for capacity W = 8.',
    solutionSummary: 'Form 2D table DP[i][w] = max(DP[i-1][w], val[i] + DP[i-1][w-wt[i]]). Backtrack from bottom-right corner to identify selected items.'
  }
];

export const NITH_STATS = {
  totalPapers: '520+',
  repeatedPyqs: '840+',
  branchesCount: '8',
  contributors: '1,200+',
  avgScoreBoost: '22%'
};

export const INITIAL_COMMUNITY_DISCUSSIONS = [
  {
    id: 'disc-1',
    title: 'How to quickly recognize LR vs RL rotation in AVL insertion without getting confused in exam?',
    question: 'In the CS-211 Mid-Term 2024 paper, question 2 asked to insert [45, 23, 67, 12, 34, 89, 56]. I always get confused between LR and RL double rotations under 2-hour exam pressure. Is there a simple shortcut or rule of thumb used by toppers?',
    subject: 'Data Structures & Algorithms',
    code: 'CS-211',
    dept: 'cse',
    semester: '3',
    author: 'Aryan Thakur (23BCS012)',
    date: '3 hours ago',
    tags: ['AVL Trees', 'Rotations', 'Exam Trick', 'CS-211'],
    answers: [
      {
        id: 'ans-1-1',
        author: 'Aman Sharma (CSE 22BCS041 - 9.6 CGPA)',
        authorRole: 'NITH Topper & Teaching Assistant',
        date: '2 hours ago',
        upvotes: 148,
        rating: 4.9,
        isTopperVerified: true,
        content: `Here is the golden shortcut I used in my 3rd Sem Mid-Term:
1. Always look at the 2 edges below the critical unbalanced node (the node with BF = +2 or -2):
   • Left child, then Left child again? -> LL rotation (Single Right Rotate).
   • Right child, then Right child again? -> RR rotation (Single Left Rotate).
   • Left child, but Right grandchild? -> LR rotation (Left rotate child, then Right rotate parent).
   • Right child, but Left grandchild? -> RL rotation (Right rotate child, then Left rotate parent).

2. Memory Anchor: The rotation name matches the zig-zag direction of the inserted node relative to the grandparent!
If it goes Left then Right (LR), you first fix the R by rotating Left, then fix the L by rotating Right.

3. Final check: The middle value ALWAYS becomes the new local root. For example, if nodes are 23, 34, 45, 34 must end up as root with 23 left and 45 right!`,
        commentsCount: 14
      },
      {
        id: 'ans-1-2',
        author: 'Priya Verma (CSE 22BCS078)',
        authorRole: 'Peer Contributor',
        date: '1 hour ago',
        upvotes: 42,
        rating: 4.7,
        isTopperVerified: false,
        content: 'Also remember to write the balance factor on the side of every node after each step. In NITH exams, professors deduct 2 marks if BF values (-1, 0, 1) are missing even if the final tree shape is correct.',
        commentsCount: 3
      }
    ]
  },
  {
    id: 'disc-2',
    title: 'Banker\'s Algorithm: What if multiple processes satisfy Need <= Work at the same step?',
    question: 'In the Operating Systems (CS-311) 2024 Mid-Term, when executing the Safety Algorithm, both P1 and P3 had their Need <= Work at step 2. Does the order of choosing P1 vs P3 matter for the safe sequence? Can there be multiple valid safe sequences in NITH checking?',
    subject: 'Operating Systems',
    code: 'CS-311',
    dept: 'cse',
    semester: '5',
    author: 'Rohan Dogra (22BCS059)',
    date: '5 hours ago',
    tags: ['Operating Systems', 'Deadlocks', 'Bankers Algorithm', 'CS-311'],
    answers: [
      {
        id: 'ans-2-1',
        author: 'Sahil Kapoor (CSE 21BCS012 - Class Representative)',
        authorRole: 'OS Subject Tutor',
        date: '4 hours ago',
        upvotes: 116,
        rating: 4.9,
        isTopperVerified: true,
        content: `Yes! There can be multiple valid safe sequences, and any safe sequence will fetch you FULL marks!

• If both P1 and P3 have Need <= Available, you can pick either one.
• If you pick P1 first, your sequence might be <P1, P3, P0, P2, P4>.
• If you pick P3 first, your sequence might be <P3, P1, P0, P2, P4>.

Crucial NITH Tip: Mention a note on your answer sheet: "Note: Since both P1 and P3 had Need <= Work at step 2, <P3, P1, ...> is also an equally valid safe sequence."
Professors love this because it proves you didn't just memorize the solution sheet!`,
        commentsCount: 8
      }
    ]
  },
  {
    id: 'disc-3',
    title: 'Why is Rf >= 2*R1 required for sustained oscillations in Wien Bridge Oscillator?',
    question: 'In Analog Electronics EC-212, why does the non-inverting gain have to be at least 3? Can someone provide the exact derivation of beta = 1/3 at resonance frequency?',
    subject: 'Analog Electronics',
    code: 'EC-212',
    dept: 'ece',
    semester: '3',
    author: 'Ananya Dogra (23BEC034)',
    date: '1 day ago',
    tags: ['EC-212', 'Oscillators', 'Wien Bridge', 'Derivation'],
    answers: [
      {
        id: 'ans-3-1',
        author: 'Kunal Chauhan (ECE 21BEC023 - Gate ECE Topper)',
        authorRole: 'ECE Core Mentor',
        date: '18 hours ago',
        upvotes: 95,
        rating: 4.8,
        isTopperVerified: true,
        content: `Here is the clean 3-step derivation:
1. The feedback network consists of series RC (Z1 = R + 1/jωC) and parallel RC (Z2 = R || (1/jωC)).
2. Feedback factor β = Z2 / (Z1 + Z2) = 1 / (3 + j(ωRC - 1/ωRC)).
3. At resonant frequency fo = 1 / (2πRC), the imaginary term vanishes:
   ωRC - 1/(ωRC) = 0 => β = 1 / 3.
4. According to Barkhausen criterion: Loop Gain |A * β| ≥ 1.
   A * (1/3) ≥ 1 => A ≥ 3.
5. For a non-inverting OP-AMP amplifier: A = 1 + Rf / R1.
   1 + Rf / R1 ≥ 3  =>  Rf / R1 ≥ 2  =>  Rf ≥ 2 * R1.`,
        commentsCount: 6
      }
    ]
  }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    title: 'Mid-Term Examinations Autumn 2024 Date Sheet & Seating Plan Released',
    category: 'Exams',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    isPinned: true,
    author: 'Dean Academics Notice Board (Shared by Aman Sharma - 22BCS041)',
    date: '2 hours ago',
    content: 'The official date sheet for Mid-Term Examinations for 3rd, 5th, and 7th Semester B.Tech has been notified. Exams will be held in two shifts: Morning Shift (10:00 AM - 12:00 PM) in New Lecture Hall Complex (NLHC) and Evening Shift (2:00 PM - 4:00 PM). Ensure you carry your Institute Identity Card and Non-programmable Scientific Calculators. Check the department notice boards for room-wise seating matrices.',
    reactions: {
      helpful: 89,
      fire: 42,
      important: 67,
      heart: 24
    },
    comments: [
      {
        id: 'c-1',
        author: 'Rohan Dogra (22BCS059)',
        date: '1 hour ago',
        text: 'Are normal analog watches allowed inside NLHC exam halls or only wall clocks?'
      },
      {
        id: 'c-2',
        author: 'Aman Sharma (22BCS041)',
        date: '45 mins ago',
        text: 'Normal analog watches are allowed, but smart watches and digital fitness bands are strictly banned.'
      }
    ]
  },
  {
    id: 'ann-2',
    title: 'Annual Technical Festival NIMBUS 2025: Hackathon & Coding Marathon Registration Live!',
    category: 'Hackathon & Events',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    isPinned: true,
    author: 'Team NIMBUS & CSEC (Computer Science Engineers Club)',
    date: '5 hours ago',
    content: 'Get ready for NITH’s flagship 36-hour hackathon "HackSurge" under NIMBUS 2025! Tracks include AI/ML, Decentralized Web, HealthTech, and Open Innovation. Cash prize pool of ₹1,50,000 + Internship fast-tracks for winning teams. Teams of 2 to 4 members from all departments are welcome to register.',
    reactions: {
      helpful: 64,
      fire: 95,
      important: 38,
      heart: 51
    },
    comments: [
      {
        id: 'c-3',
        author: 'Ananya Dogra (23BEC034)',
        date: '3 hours ago',
        text: 'Looking for a frontend teammate familiar with React and Tailwind! Any 2nd or 3rd year interested?'
      },
      {
        id: 'c-4',
        author: 'Kunal Chauhan (21BEC023)',
        date: '2 hours ago',
        text: 'All the best everyone! Make sure you submit prototype repos on GitHub with clean READMEs.'
      }
    ]
  },
  {
    id: 'ann-3',
    title: 'CS-211 DSA & EC-212 Class Test - 2 Rescheduled to Thursday',
    category: 'Academics',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    isPinned: false,
    author: 'Class Representative (CR CSE 2nd Year)',
    date: 'Yesterday',
    content: 'Due to the national holiday on Wednesday, the Class Test - 2 for Data Structures (CS-211) and Analog Electronics (EC-212) has been shifted to Thursday during the tutorial hour. Syllabus includes Trees, Heaps, and Small Signal BJT amplifier models.',
    reactions: {
      helpful: 53,
      fire: 14,
      important: 41,
      heart: 19
    },
    comments: [
      {
        id: 'c-5',
        author: 'Shivam Sharma (23BCS045)',
        date: 'Yesterday',
        text: 'Thanks for the update! Gives us an extra day to practice AVL rotations.'
      }
    ]
  },
  {
    id: 'ann-4',
    title: 'Central Library Extended Night Reading Hours for Mid-Term Week',
    category: 'Campus Notice',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    isPinned: false,
    author: 'Chief Librarian, Central Library NITH',
    date: '2 days ago',
    content: 'In view of the upcoming mid-semester examinations, the Central Library reading halls will remain open until 2:00 AM starting this Monday through the end of exam week. High-speed campus Wi-Fi and power sockets will be active throughout.',
    reactions: {
      helpful: 112,
      fire: 31,
      important: 56,
      heart: 78
    },
    comments: []
  }
];

export const SUGGESTED_TOPICS_DATA = [
  {
    id: 'sug-1',
    rank: 1,
    topic: 'AVL Trees: LL, RR, LR, RL Rotations & Balancing Equations',
    subject: 'Data Structures & Algorithms',
    code: 'CS-211',
    dept: 'cse',
    semester: '3',
    repeatCount: 'Repeated 6 Times in 5 Years',
    expectedMarks: '8 - 10 Marks',
    urgency: 'Compulsory Hitlist',
    whyTonight: 'Guaranteed 10 marks question. Professors alternate giving 6 or 7 values to build tree with every single rotation labeled.',
    keyPoints: [
      'Balance Factor BF = Height(Left) - Height(Right) must be in {-1, 0, +1}',
      'LL rotation: Single right rotate unbalanced node; RR rotation: Single left rotate unbalanced node',
      'LR double rotation: Left rotate left child, then Right rotate grandparent',
      'RL double rotation: Right rotate right child, then Left rotate grandparent',
      'Golden Rule: Middle value always emerges as the local balanced subtree root'
    ]
  },
  {
    id: 'sug-2',
    rank: 2,
    topic: 'Banker’s Algorithm: Safety Sequence & Resource Request Algorithm',
    subject: 'Operating Systems',
    code: 'CS-311',
    dept: 'cse',
    semester: '5',
    repeatCount: 'Repeated 5 Times in 5 Years',
    expectedMarks: '8 - 10 Marks',
    urgency: 'Super High Yield',
    whyTonight: 'Highest scoring numerical in OS. Draws full marks if Need matrix and Work vector calculations are kept in clean tabular format.',
    keyPoints: [
      'Calculate Need[i][j] = Max[i][j] - Allocation[i][j] first',
      'Work vector initialized to Available vector; Finish[i] = false',
      'Find process i where Finish[i] == false and Need[i] <= Work',
      'Work = Work + Allocation[i]; Finish[i] = true (release resources)',
      'Multiple safe sequences are equally valid; state this note for bonus impression'
    ]
  },
  {
    id: 'sug-3',
    rank: 3,
    topic: 'Database Normalization: 3NF vs BCNF Lossless Decomposition',
    subject: 'Database Management Systems',
    code: 'CS-221',
    dept: 'cse',
    semester: '4',
    repeatCount: 'Repeated 5 Times in 5 Years',
    expectedMarks: '10 Marks',
    urgency: 'Core Subject Pillar',
    whyTonight: 'Almost every end-term DBMS paper has a 10-mark question requiring candidate key discovery and BCNF decomposition.',
    keyPoints: [
      'Find candidate keys using attribute closure X+',
      '3NF requires X -> Y where X is superkey OR Y is prime attribute',
      'BCNF strictly requires X to be a superkey for every non-trivial FD',
      'Check dependency preservation: BCNF may fail dependency preservation, 3NF always preserves it'
    ]
  },
  {
    id: 'sug-4',
    rank: 4,
    topic: 'Wien Bridge Oscillator: Frequency Derivation & Gain Criteria (Rf >= 2*R1)',
    subject: 'Analog Electronics',
    code: 'EC-212',
    dept: 'ece',
    semester: '3',
    repeatCount: 'Repeated 6 Times in 5 Years',
    expectedMarks: '8 - 10 Marks',
    urgency: 'Compulsory Hitlist',
    whyTonight: 'Most frequently repeated theoretical derivation in ECE 3rd semester examinations.',
    keyPoints: [
      'Lead-lag RC feedback network beta = 1 / (3 + j(omega*RC - 1/(omega*RC)))',
      'At resonance frequency fo = 1 / (2*pi*R*C), imaginary term is zero, so beta = 1/3',
      'Barkhausen criterion |A*beta| >= 1 requires amplifier non-inverting gain A >= 3',
      'Since A = 1 + Rf / R1 >= 3, gain setting resistors must satisfy Rf >= 2 * R1'
    ]
  },
  {
    id: 'sug-5',
    rank: 5,
    topic: '8-Point Radix-2 Decimation-in-Time (DIT) FFT Butterfly Signal Flow',
    subject: 'Digital Signal Processing',
    code: 'EC-311',
    dept: 'ece',
    semester: '5',
    repeatCount: 'Repeated 5 Times in 5 Years',
    expectedMarks: '10 Marks',
    urgency: 'Direct 10 Marks',
    whyTonight: 'Standard direct numerical. Draw neat horizontal signal flow paths with ruler to score 10/10.',
    keyPoints: [
      'Input entered in bit-reversed order: x(0), x(4), x(2), x(6), x(1), x(5), x(3), x(7)',
      'Number of stages = log2(8) = 3 stages',
      'Stage 1 uses W8^0; Stage 2 uses W8^0, W8^2; Stage 3 uses W8^0, W8^1, W8^2, W8^3',
      'Twiddle factor W_N^k = e^(-j*2*pi*k / N)'
    ]
  },
  {
    id: 'sug-6',
    rank: 6,
    topic: 'Thermal Efficiency Derivation: Otto Cycle vs Diesel Cycle',
    subject: 'Thermodynamics & Heat Transfer',
    code: 'ME-211',
    dept: 'me',
    semester: '3',
    repeatCount: 'Repeated 5 Times in 5 Years',
    expectedMarks: '10 Marks',
    urgency: 'Mechanical Core',
    whyTonight: 'P-V and T-s diagrams alone carry 40% of question marks. Must draw them accurately with isentropic curves.',
    keyPoints: [
      'Otto cycle efficiency: eta_otto = 1 - 1 / (r^(gamma - 1))',
      'Diesel cycle efficiency: eta_diesel = 1 - [1 / (r^(gamma - 1))] * [(rc^gamma - 1) / (gamma * (rc - 1))]',
      'For same compression ratio r, Otto cycle efficiency is strictly greater than Diesel cycle',
      'Define cut-off ratio rc = V3 / V2 clearly'
    ]
  }
];

export const FLASHCARDS_DATA = [
  {
    id: 'fc-1',
    subject: 'Data Structures & Algorithms',
    code: 'CS-211',
    topic: 'AVL Balance Factor',
    question: 'How is Balance Factor calculated in an AVL Tree and what are valid values?',
    answerSummary: 'BF = Height(Left Subtree) - Height(Right Subtree). Valid values for any balanced AVL node are strictly {-1, 0, +1}. If BF reaches +2 or -2, immediate rotation (LL, RR, LR, or RL) is required.',
    bullets: [
      'Leaf node always has BF = 0',
      'BF = +2 requires Right rotation (LL) or Left-Right double rotation (LR)',
      'BF = -2 requires Left rotation (RR) or Right-Left double rotation (RL)'
    ],
    nithTip: 'Always calculate BF bottom-up from newly inserted node towards root.'
  },
  {
    id: 'fc-2',
    subject: 'Operating Systems',
    code: 'CS-311',
    topic: 'Belady’s Anomaly',
    question: 'What is Belady’s Anomaly and which page replacement algorithms are immune to it?',
    answerSummary: 'Belady’s Anomaly is the counter-intuitive phenomenon where increasing physical page frames leads to MORE page faults. FIFO suffers from Belady’s anomaly.',
    bullets: [
      'FIFO suffers from Belady’s anomaly on string: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5',
      'Stack-based algorithms (LRU and Optimal) NEVER suffer from Belady’s anomaly',
      'Proof: In stack algorithms, set of pages in k frames is always a subset of pages in (k+1) frames'
    ],
    nithTip: 'Mention "Stack Property" to secure 100% marks in NITH exams.'
  },
  {
    id: 'fc-3',
    subject: 'Database Management Systems',
    code: 'CS-221',
    topic: 'ACID Properties',
    question: 'Define the 4 ACID properties of database transactions and who manages them.',
    answerSummary: 'Atomicity (All or nothing - Recovery manager), Consistency (Preserves database invariants - Application & DBMS), Isolation (Concurrent transactions do not interfere - Concurrency control / 2PL), Durability (Committed changes survive crashes - Recovery & Write-Ahead Logging).',
    bullets: [
      'A: Handled by Undo logging / Rollback',
      'C: Handled by Integrity constraints & Triggers',
      'I: Handled by Two-Phase Locking (2PL) protocols',
      'D: Handled by WAL (Write-Ahead Logging) and checkpointing'
    ],
    nithTip: 'Draw transaction state transition diagram: Active -> Partially Committed -> Committed.'
  },
  {
    id: 'fc-4',
    subject: 'Analog Electronics',
    code: 'EC-212',
    topic: 'Barkhausen Criterion',
    question: 'State the two Barkhausen conditions for sustained sinusoidal oscillations.',
    answerSummary: 'Condition 1 (Magnitude): Loop gain magnitude |A * beta| must equal 1 (practically >= 1 for self-start). Condition 2 (Phase): Net phase shift around the feedback loop must be 0° or 360° (integral multiple of 2π).',
    bullets: [
      'If |A * beta| < 1: Oscillations die down exponentially',
      'If |A * beta| > 1: Oscillations grow until limited by amplifier non-linearities',
      'If ∠Aβ != 0°: Signal cancels out and sustained oscillations cannot exist'
    ],
    nithTip: 'Mention both criteria in two distinct numbered points with formulas.'
  },
  {
    id: 'fc-5',
    subject: 'Data Structures & Algorithms',
    code: 'CS-211',
    topic: 'Dijkstra vs Bellman-Ford',
    question: 'Why does Dijkstra’s algorithm fail for negative edge weights, while Bellman-Ford succeeds?',
    answerSummary: 'Dijkstra is greedy: once a vertex is marked visited / extracted from min-heap, its distance is finalized and never revisited. A negative edge can later provide a shorter path, breaking Dijkstra’s invariant. Bellman-Ford relaxes all edges (V - 1) times regardless of weight signs.',
    bullets: [
      'Dijkstra Time Complexity: O((V + E) log V) with min-heap',
      'Bellman-Ford Time Complexity: O(V * E)',
      'Bellman-Ford also detects negative weight cycles on V-th iteration'
    ],
    nithTip: 'Draw a simple 3-node triangle with one edge = -5 to demonstrate Dijkstra failure.'
  },
  {
    id: 'fc-6',
    subject: 'Operating Systems',
    code: 'CS-311',
    topic: 'Deadlock 4 Conditions',
    question: 'What are the 4 necessary and sufficient Coffman conditions for deadlock to occur?',
    answerSummary: '1. Mutual Exclusion (non-shareable resources), 2. Hold and Wait (process holds resources while waiting for more), 3. No Preemption (resources cannot be forcibly taken), 4. Circular Wait (chain of processes waiting for next in circle).',
    bullets: [
      'Breaking ANY one condition prevents deadlock entirely',
      'Deadlock Prevention: Disallow one of the 4 conditions at design time',
      'Deadlock Avoidance: Banker’s algorithm dynamically ensures system stays in safe state'
    ],
    nithTip: 'State that breaking Circular Wait (linear resource ordering) is the most practical prevention.'
  }
];

export const LEADERBOARD_DATA = [
  {
    rank: 1,
    name: 'Aman Sharma',
    rollNo: '22BCS041',
    branch: 'Computer Science (CSE)',
    year: '3rd Year',
    exp: 1480,
    badge: '🥇 Gold Scholar & Top Mentor',
    questionsAnswered: 38,
    upvotesReceived: 184,
    rankShift: '+0'
  },
  {
    rank: 2,
    name: 'Priya Verma',
    rollNo: '21BCS019',
    branch: 'Computer Science (CSE)',
    year: '4th Year',
    exp: 1290,
    badge: '🥈 Senior Peer Contributor',
    questionsAnswered: 31,
    upvotesReceived: 156,
    rankShift: '+1'
  },
  {
    rank: 3,
    name: 'Kunal Chauhan',
    rollNo: '21BEC023',
    branch: 'Electronics & Comm. (ECE)',
    year: '4th Year',
    exp: 1140,
    badge: '🥉 GATE ECE Top Ranked',
    questionsAnswered: 27,
    upvotesReceived: 139,
    rankShift: '+2'
  },
  {
    rank: 4,
    name: 'Sahil Kapoor',
    rollNo: '21BCS012',
    branch: 'Computer Science (CSE)',
    year: '4th Year',
    exp: 980,
    badge: '⭐ OS & Systems Tutor',
    questionsAnswered: 23,
    upvotesReceived: 118,
    rankShift: '-1'
  },
  {
    rank: 5,
    name: 'Ananya Dogra',
    rollNo: '22BEC055',
    branch: 'Electronics & Comm. (ECE)',
    year: '3rd Year',
    exp: 860,
    badge: '⚡ Analog Circuits Ace',
    questionsAnswered: 19,
    upvotesReceived: 98,
    rankShift: '+3'
  },
  {
    rank: 6,
    name: 'Aditya Sen',
    rollNo: '21BME071',
    branch: 'Mechanical Engineering (ME)',
    year: '4th Year',
    exp: 790,
    badge: '⚙️ Thermal Science Specialist',
    questionsAnswered: 17,
    upvotesReceived: 88,
    rankShift: '+0'
  },
  {
    rank: 7,
    name: 'Vikas Rana',
    rollNo: '22BEE034',
    branch: 'Electrical Engineering (EE)',
    year: '3rd Year',
    exp: 720,
    badge: '💡 Electrical Machines Lead',
    questionsAnswered: 15,
    upvotesReceived: 79,
    rankShift: '-2'
  },
  {
    rank: 8,
    name: 'Shubham Katoch',
    rollNo: '22BCE015',
    branch: 'Civil Engineering (CE)',
    year: '3rd Year',
    exp: 670,
    badge: '🏗️ Structural Mechanics Expert',
    questionsAnswered: 14,
    upvotesReceived: 71,
    rankShift: '+1'
  },
  {
    rank: 9,
    name: 'Rohan Dogra',
    rollNo: '22BCS059',
    branch: 'Computer Science (CSE)',
    year: '3rd Year',
    exp: 590,
    badge: '🔥 Active Community Contributor',
    questionsAnswered: 12,
    upvotesReceived: 62,
    rankShift: '+4'
  },
  {
    rank: 10,
    name: 'Divya Guleria',
    rollNo: '22BCS014',
    branch: 'Computer Science (CSE)',
    year: '3rd Year',
    exp: 540,
    badge: '📊 DBMS Query Master',
    questionsAnswered: 11,
    upvotesReceived: 56,
    rankShift: '-1'
  }
];

export const ALUMNI_DATA = [
  {
    id: 'alum-1',
    name: 'Akash Dhiman',
    batch: 'Batch of 2022',
    branch: 'Computer Science & Engg.',
    company: 'Google',
    role: 'Software Engineer (L4)',
    location: 'Bangalore, India',
    tier: 'Product MNC',
    avatar: 'A',
    advice: 'At NITH, master Data Structures and Operating Systems thoroughly. In Google technical rounds, they love asking concurrency and tree algorithms. Do LeetCode Medium/Hard consistently for 6 months.',
    qna: [
      {
        id: 'qna-1',
        student: 'Shivam Sharma (23BCS045)',
        question: 'Hi bhaiya! When does Google on-campus or off-campus hiring start for 3rd/4th years, and what topics should we prioritize?',
        reply: 'Google off-campus usually opens around August for next year batches. Prioritize Graphs (Dijkstra, BFS), Dynamic Programming, and Trie. Make sure you can write clean, production-ready code with zero syntax errors on Google Docs.'
      }
    ]
  },
  {
    id: 'alum-2',
    name: 'Riddhima Sharma',
    batch: 'Batch of 2023',
    branch: 'Computer Science & Engg.',
    company: 'Microsoft',
    role: 'Software Development Engineer - I',
    location: 'Hyderabad, India',
    tier: 'Product MNC',
    avatar: 'R',
    advice: 'Microsoft looks heavily for communication skills and how you explain your approach before jumping into code. Practice explaining your logic out loud while solving questions.',
    qna: [
      {
        id: 'qna-2',
        student: 'Ananya Dogra (23BEC034)',
        question: 'Can ECE students also sit for Microsoft on-campus recruitment at NIT Hamirpur?',
        reply: 'Yes! ECE, EE, and CSE are all eligible for Microsoft SDE roles at NITH. As long as your DSA and OOP basics are rock solid, branch will never hold you back.'
      }
    ]
  },
  {
    id: 'alum-3',
    name: 'Tushar Katoch',
    batch: 'Batch of 2022',
    branch: 'Electronics & Communication',
    company: 'Texas Instruments',
    role: 'Analog / Digital IC Design Engineer',
    location: 'Bangalore, India',
    tier: 'Core Semiconductor',
    avatar: 'T',
    advice: 'For core electronics placements, Analog Electronics (BJT, OP-AMPs, Oscillators) and Digital Logic Design (State Machines, Setup & Hold times) are the make-or-break subjects. NITH core students have a massive advantage if they know hybrid-pi models and CMOS fundamentals.',
    qna: [
      {
        id: 'qna-3',
        student: 'Kunal Chauhan (21BEC023)',
        question: 'What projects stand out on resume for Texas Instruments and Qualcomm interviews?',
        reply: 'Design an OP-AMP based audio amplifier, simulate a 4-bit synchronous counter in Verilog, or build an MCU based IoT telemetry system. Hands-on laboratory projects carry massive weight in core rounds.'
      }
    ]
  },
  {
    id: 'alum-4',
    name: 'Ankit Verma',
    batch: 'Batch of 2021',
    branch: 'Computer Science & Engg.',
    company: 'Amazon',
    role: 'SDE - II (AWS Infrastructure)',
    location: 'Seattle / Bangalore',
    tier: 'Product MNC',
    avatar: 'A',
    advice: 'Read the 16 Amazon Leadership Principles. Every single interview round at Amazon has 20-30 minutes dedicated to behavioral questions based on these principles. Use the STAR method (Situation, Task, Action, Result).',
    qna: [
      {
        id: 'qna-4',
        student: 'Rohan Dogra (22BCS059)',
        question: 'How to prepare Low-Level Design (LLD) and OOP for Amazon 6-month intern conversions?',
        reply: 'Focus on Solid Principles, Factory Pattern, Observer Pattern, and Singleton. Practice designing a Parking Lot system or Elevator system with clean class diagrams.'
      }
    ]
  }
];



