class Edge {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
}

class Graph {
  constructor(adjacency, isDirected = true) {
    this._isDirected = isDirected;
    this._inputAdjacency(adjacency);
  }

  _inputAdjacency(adjacency) {
    const connectivity = adjacency
      .split('\n')
      .map(edgeStr => edgeStr.split('').filter(x => x.match(/[01]/)));

    if (!connectivity.every(list => list.length === connectivity.length)) {
      throw new Error('incomplete adjacency matrix');
    }

    // eslint-disable-next-line no-unused-vars
    this._vertices = connectivity.map(_ => []);
    for (let fromIndex = 0; fromIndex < connectivity.length; fromIndex++) {
      for (let toIndex = 0; toIndex < connectivity.length; toIndex++) {
        if (connectivity[fromIndex][toIndex] === '1') {
          this.addEdge(fromIndex, toIndex);
        }
      }
    }
  }

  addEdge(from, to) {
    if (this.exists(from, to)) {
      return;
    }

    this._vertices[from].push(new Edge(from, to));

    if (!this._isDirected) {
      this._vertices[to].push(new Edge(to, from));
    }
  }

  exists(from, to) {
    return this._vertices[from].some(edge => edge.to === to);
  }

  toString() {
    // eslint-disable-next-line no-unused-vars
    const zeros = this._vertices.map(_ => '0');
    const summary = [];

    this._vertices.forEach(vertex => {
      const vertexSummary = zeros.slice();

      vertex.forEach(edge => {
        vertexSummary[edge.to] = '1';
      });

      summary.push(vertexSummary.join(''));
    });

    return summary.join('\n');
  }

  bfs(start = 0) {
    // eslint-disable-next-line no-unused-vars
    const vertexStates = this._vertices.map(v => ({
      color: 'white',
      parent: null,
      distance: 0
    }));
    const queue = [start];

    while (queue.length) {
      const currentI = queue.shift();
      const currentV = this._vertices[currentI];
      const currentVState = vertexStates[currentI];
      // process vertex?
      currentV.forEach(edge => {
        // process edge?
        const destinationI = edge.to;
        const destination = vertexStates[destinationI];
        if (destination.color === 'white') {
          destination.color = 'gray';
          destination.parent = currentI;
          destination.distance = currentVState.distance + 1;
          queue.push(destinationI);
        }
      });
      currentVState.color = 'black';
    }

    return vertexStates;
  }
}

export { Graph };
