def solve(disks):
    moves = []
    A, B, C = list(disks), [], []

    def can_place(disk, stack):
        if not stack:
            return True
        top = stack[-1]
        return disk[0] < top[0] and disk[1] != top[1]

    def move(n, source, target, auxiliary, src_name, tgt_name, aux_name):
        if n == 0: # Base case: no disks to move
            return True
        
        if not move(n - 1, source, auxiliary, target, src_name, aux_name, tgt_name):
            return False

        disk = source[-1]
        if not can_place(disk, target):
            return False

        source.pop()
        target.append(disk)
        moves.append((disk[0], src_name, tgt_name))

        if not move(n - 1, auxiliary, target, source, aux_name, tgt_name, src_name):
            return False

        return True

    success = move(len(disks), A, C, B, "A", "C", "B")
    return moves if success else -1