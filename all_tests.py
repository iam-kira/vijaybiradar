# Copyright (c) 2026 iam-kira (Vijay Biradar)
# Licensed under the MIT License. See LICENSE for the full text.

import aura

Q = '"'


def ev(source):
    result, error = aura.run('<stdin>', source, aura.new_symbol_table())
    if isinstance(result, list):
        result = result[-1] if result else None
    return result, error


# --- for ... in ---

def test_for_in_over_a_list():
    result, error = ev('stash t = 0\ngrind x among [1, 2, 3] ong\nt = t + x\nbet\nt')
    assert error is None
    assert repr(result) == '6'


def test_for_in_over_a_string_yields_characters():
    result, error = ev('stash s = ""\ngrind c among ' + Q + 'abc' + Q + ' ong\ns = c + s\nbet\ns')
    assert error is None
    assert result.value == 'cba'


def test_for_in_over_an_empty_list_skips_the_body():
    result, error = ev('stash t = 99\ngrind x among [] ong\nt = 0\nbet\nt')
    assert error is None
    assert repr(result) == '99'


def test_for_in_supports_break_and_continue():
    result, error = ev('stash t = 0\ngrind x among [1, 2, 3, 4] ong\nfr x == 2 ong\nskip\nbet\n'
                       'fr x == 4 ong\nbail\nbet\nt = t + x\nbet\nt')
    assert error is None
    assert repr(result) == '4'


def test_for_in_over_a_number_is_rejected():
    result, error = ev('grind x among 5 ong\n1\nbet')
    assert result is None
    assert 'Cannot iterate over a math' in error.details


def test_mutating_the_list_during_iteration_does_not_change_the_loop():
    result, error = ev('stash xs = [1, 2, 3]\nstash n = 0\ngrind x among xs ong\nn = n + 1\nxs[0] = 99\nbet\nn')
    assert error is None
    assert repr(result) == '3'


# --- index assignment ---

def test_index_assignment():
    result, error = ev('stash xs = [1, 2, 3]\nxs[0] = 99\nxs')
    assert error is None
    assert repr(result) == '[99, 2, 3]'


def test_negative_index_assignment():
    result, error = ev('stash xs = [1, 2, 3]\nxs[-1] = 9\nxs')
    assert error is None
    assert repr(result) == '[1, 2, 9]'


def test_nested_index_assignment():
    result, error = ev('stash g = [[1, 2], [3, 4]]\ng[1][0] = 9\ng')
    assert error is None
    assert repr(result) == '[[1, 2], [9, 4]]'


def test_index_assignment_is_bounds_checked():
    result, error = ev('stash xs = [1]\nxs[5] = 1')
    assert result is None
    assert 'out of range' in error.details


def test_assigning_into_a_string_is_rejected():
    result, error = ev('stash s = ' + Q + 'abc' + Q + '\ns[0] = ' + Q + 'z' + Q)
    assert result is None
    assert 'Cannot assign into a yap' in error.details


def test_lists_keep_value_semantics_across_variables():
    result, error = ev('stash a = [1, 2]\nstash b = a\nb[0] = 9\na')
    assert error is None
    assert repr(result) == '[1, 2]'


def test_cannot_assign_to_a_literal():
    result, error = ev('1 = 2')
    assert result is None
    assert 'Cannot assign' in error.details


# --- compound assignment ---

def test_compound_assignment_operators():
    cases = {'n += 3': '8', 'n -= 3': '2', 'n *= 3': '15', 'n /= 5': '1'}
    for source, expected in cases.items():
        result, error = ev('stash n = 5\n' + source + '\nn')
        assert error is None, source
        assert repr(result) == expected, source


def test_compound_assignment_on_an_index():
    result, error = ev('stash xs = [1, 2]\nxs[0] += 10\nxs')
    assert error is None
    assert repr(result) == '[11, 2]'


def test_compound_assignment_works_on_strings():
    result, error = ev('stash s = ' + Q + 'a' + Q + '\ns += ' + Q + 'b' + Q + '\ns')
    assert error is None
    assert result.value == 'ab'


def test_compound_assignment_needs_a_declared_name():
    result, error = ev('nope += 1')
    assert result is None
    assert "'nope' is not defined" in error.details
# Copyright (c) 2026 iam-kira (Vijay Biradar)
# Licensed under the MIT License. See LICENSE for the full text.

import aura

Q = '"'


def ev(source):
    result, error = aura.run('<stdin>', source, aura.new_symbol_table())
    if isinstance(result, list):
        result = result[-1] if result else None
    return result, error


def check(cases):
    for source, expected in cases.items():
        result, error = ev(source)
        assert error is None, (source, error.details if error else None)
        assert repr(result) == expected, source


def test_bag_literals():
    check({
        '{}': '{}',
        '{' + Q + 'a' + Q + ': 1}': '{"a": 1}',
        '{1: ' + Q + 'one' + Q + '}': '{1: "one"}',
    })


def test_bag_literal_may_span_lines_with_a_trailing_comma():
    result, error = ev('{\n' + Q + 'a' + Q + ': 1,\n' + Q + 'b' + Q + ': 2,\n}')
    assert error is None
    assert repr(result) == '{"a": 1, "b": 2}'


def test_lookup_by_label():
    check({'{' + Q + 'a' + Q + ': 1, ' + Q + 'b' + Q + ': 2}[' + Q + 'b' + Q + ']': '2'})


def test_missing_label_is_an_error():
    result, error = ev('{' + Q + 'a' + Q + ': 1}[' + Q + 'z' + Q + ']')
    assert result is None
    assert 'No label' in error.details


def test_only_maths_and_yaps_may_be_labels():
    result, error = ev('{' + Q + 'a' + Q + ': 1}[[1]]')
    assert result is None
    assert 'label must be a math or a yap' in error.details


def test_assigning_a_new_label():
    result, error = ev('stash d = {' + Q + 'a' + Q + ': 1}\nd[' + Q + 'b' + Q + '] = 2\nd')
    assert error is None
    assert repr(result) == '{"a": 1, "b": 2}'


def test_compound_assignment_into_a_bag():
    result, error = ev('stash d = {' + Q + 'a' + Q + ': 1}\nd[' + Q + 'a' + Q + '] += 10\nd')
    assert error is None
    assert repr(result) == '{"a": 11}'


def test_nested_bags_and_piles():
    check({'{' + Q + 'a' + Q + ': {' + Q + 'b' + Q + ': 1}}[' + Q + 'a' + Q + '][' + Q + 'b' + Q + ']': '1'})

    result, error = ev('stash d = {' + Q + 'a' + Q + ': [1, 2]}\nd[' + Q + 'a' + Q + '][0] = 9\nd')
    assert error is None
    assert repr(result) == '{"a": [9, 2]}'


def test_bags_keep_value_semantics():
    source = ('stash a = {' + Q + 'x' + Q + ': 1}\nstash b = a\n'
              'b[' + Q + 'x' + Q + '] = 9\na')
    result, error = ev(source)
    assert error is None
    assert repr(result) == '{"x": 1}'


def test_merging_with_plus_lets_the_right_win():
    check({
        '{' + Q + 'a' + Q + ': 1} + {' + Q + 'b' + Q + ': 2}': '{"a": 1, "b": 2}',
        '{' + Q + 'a' + Q + ': 1} + {' + Q + 'a' + Q + ': 9}': '{"a": 9}',
    })


def test_equality_is_by_value():
    check({
        '{' + Q + 'a' + Q + ': 1} == {' + Q + 'a' + Q + ': 1}': '1',
        '{' + Q + 'a' + Q + ': 1} == {' + Q + 'a' + Q + ': 2}': '0',
        '{} == {}': '1',
        '{} == []': '0',
    })


def test_empty_bag_is_falsy():
    check({'nah {}': '1', 'nah {' + Q + 'a' + Q + ': 1}': '0'})


def test_howmany_labels_and_goods():
    bag = '{' + Q + 'a' + Q + ': 1, ' + Q + 'b' + Q + ': 2}'
    check({
        'howmany(' + bag + ')': '2',
        'labels(' + bag + ')': '["a", "b"]',
        'goods(' + bag + ')': '[1, 2]',
        'whatis(' + bag + ')': '"bag"',
    })


def test_labels_needs_a_bag():
    result, error = ev('labels([1])')
    assert result is None
    assert "'labels' needs a bag, got pile" in error.details


def test_gotit_checks_labels():
    bag = '{' + Q + 'a' + Q + ': 1}'
    check({'gotit(' + bag + ', ' + Q + 'a' + Q + ')': '1',
           'gotit(' + bag + ', ' + Q + 'z' + Q + ')': '0'})


def test_yoink_drops_a_label():
    result, error = ev('yoink({' + Q + 'a' + Q + ': 1, ' + Q + 'b' + Q + ': 2}, ' + Q + 'a' + Q + ')')
    assert error is None
    assert repr(result) == '{"b": 2}'


def test_yoink_of_a_missing_label_is_an_error():
    result, error = ev('yoink({' + Q + 'a' + Q + ': 1}, ' + Q + 'z' + Q + ')')
    assert result is None
    assert 'No label' in error.details


def test_among_walks_the_labels():
    source = ('stash d = {' + Q + 'a' + Q + ': 1, ' + Q + 'b' + Q + ': 2}\n'
              'stash t = 0\ngrind k among d ong\nt += d[k]\nbet\nt')
    result, error = ev(source)
    assert error is None
    assert repr(result) == '3'


def test_missing_colon_is_a_syntax_error():
    result, error = ev('{' + Q + 'a' + Q + ' 1}')
    assert result is None
    assert "Expected ':'" in error.details


def test_unclosed_bag_is_a_syntax_error():
    result, error = ev('{' + Q + 'a' + Q + ': 1')
    assert result is None
    assert "Expected ',' or '}'" in error.details
# Copyright (c) 2026 iam-kira (Vijay Biradar)
# Licensed under the MIT License. See LICENSE for the full text.

import os

import aura

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def test_example_program_runs_end_to_end(capsys):
    exit_code = aura.main([os.path.join(REPO, 'example.aura')])
    out = capsys.readouterr().out.splitlines()

    assert exit_code == 0
    assert out[:6] == ['1', '2', 'fizz', '4', 'buzz', 'fizz']
    assert 'fizzbuzz' in out
    assert '10! = 3628800' in out
    assert 'counted til 3' in out
    assert '["this", "is", "a", "language"]' in out
    assert 'aura is a language ' in out
    assert '[2, 4, 6, 8, 10]' in out
    assert '2 ^ 16 = 65536' in out
    assert '{"the": 3, "quick": 1, "lazy": 1, "end": 1}' in out
    assert 'distinct words: 4' in out
    assert 'aura still works' in out
    assert 'dodged: Division by zero' in out
    assert '10 / 0 = 0' in out


def test_missing_file_is_reported(capsys):
    exit_code = aura.main([os.path.join(REPO, 'no-such-file.aura')])
    assert exit_code == 1
    assert 'cannot read' in capsys.readouterr().out


def test_program_error_exits_nonzero(tmp_path, capsys):
    program = tmp_path / 'bad.aura'
    program.write_text('stash x = 1 / 0\n', encoding='utf-8')

    exit_code = aura.main([str(program)])
    assert exit_code == 1
    assert 'Division by zero' in capsys.readouterr().out


def test_file_mode_does_not_echo_statement_values(capsys):
    program = os.path.join(REPO, 'tests', '_echo_check.aura')
    with open(program, 'w', encoding='utf-8') as handle:
        handle.write('stash x = 99\nx\ncook("only this")\n')
    try:
        exit_code = aura.main([program])
    finally:
        os.remove(program)

    assert exit_code == 0
    assert capsys.readouterr().out == 'only this\n'
# Copyright (c) 2026 iam-kira (Vijay Biradar)
# Licensed under the MIT License. See LICENSE for the full text.

import aura


def ev(source):
    result, error = aura.run('<stdin>', source, aura.SymbolTable())
    if isinstance(result, list):
        result = result[-1] if result else None
    return result, error


def test_for_loop_sums_range_end_exclusive():
    result, error = ev('stash t = 0\ngrind i = 1 til 5 ong\nt = t + i\nbet\nt')
    assert error is None
    assert repr(result) == '10'


def test_for_loop_with_step():
    result, error = ev('stash t = 0\ngrind i = 0 til 10 by 2 ong\nt = t + i\nbet\nt')
    assert error is None
    assert repr(result) == '20'


def test_for_loop_counts_down_with_negative_step():
    result, error = ev('stash t = 0\ngrind i = 5 til 0 by -1 ong\nt = t + i\nbet\nt')
    assert error is None
    assert repr(result) == '15'


def test_for_loop_body_never_runs_when_range_empty():
    result, error = ev('stash t = 99\ngrind i = 5 til 5 ong\nt = 0\nbet\nt')
    assert error is None
    assert repr(result) == '99'


def test_for_loop_variable_is_visible_after_loop():
    result, error = ev('grind i = 0 til 3 ong\n1\nbet\ni')
    assert error is None
    assert repr(result) == '2'


def test_break_stops_the_loop():
    result, error = ev('stash t = 0\ngrind i = 0 til 10 ong\nfr i == 3 ong\nbail\nbet\nt = t + i\nbet\nt')
    assert error is None
    assert repr(result) == '3'


def test_continue_skips_one_iteration():
    result, error = ev('stash t = 0\ngrind i = 0 til 5 ong\nfr i == 2 ong\nskip\nbet\nt = t + i\nbet\nt')
    assert error is None
    assert repr(result) == '8'


def test_break_in_while_loop():
    result, error = ev('stash i = 0\nkeep based ong\ni = i + 1\nfr i > 4 ong\nbail\nbet\nbet\ni')
    assert error is None
    assert repr(result) == '5'


def test_return_exits_function_early():
    result, error = ev('chore f(n) ong\nfr n < 0 ong\nyeet 0\nbet\nyeet n * 2\nbet\nf(-5)')
    assert error is None
    assert repr(result) == '0'


def test_bare_return_yields_zero():
    result, error = ev('chore f() ong\nyeet\nbet\nf()')
    assert error is None
    assert repr(result) == '0'


def test_return_unwinds_out_of_a_loop():
    result, error = ev('chore f() ong\nkeep based ong\nyeet 7\nbet\nbet\nf()')
    assert error is None
    assert repr(result) == '7'


def test_recursion_still_works():
    result, error = ev('chore fib(n) ong\nfr n < 2 ong\nyeet n\nbet\nyeet fib(n-1) + fib(n-2)\nbet\nfib(10)')
    assert error is None
    assert repr(result) == '55'


def test_break_outside_loop_is_an_error():
    result, error = ev('bail')
    assert result is None
    assert "'bail' outside of a loop" in error.details


def test_continue_outside_loop_is_an_error():
    result, error = ev('skip')
    assert result is None
    assert "'skip' outside of a loop" in error.details


def test_return_outside_function_is_an_error():
    result, error = ev('yeet 1')
    assert result is None
    assert "'yeet' outside of a function" in error.details


def test_loop_signal_does_not_escape_a_call():
    result, error = ev('chore f() ong\nyeet 1\nbet\ngrind i = 0 til 3 ong\nf()\nbet\ni')
    assert error is None
    assert repr(result) == '2'


def test_zero_step_is_rejected():
    result, error = ev('grind i = 1 til 3 by 0 ong\n1\nbet')
    assert result is None
    assert "by cannot be 0" in error.details


def test_non_numeric_range_is_rejected():
    result, error = ev('chore f() ong\n1\nbet\ngrind i = 1 til f ong\n1\nbet')
    assert result is None
    assert 'must be a math' in error.details
"""Every source file carries a copyright notice.

Copyright (c) 2026 iam-kira (Vijay Biradar)
Licensed under the MIT License. See LICENSE for the full text.

A notice that covers most files is a notice nobody trusts. This keeps the
coverage at all of them, so a new file cannot ship without one.
"""

import glob
import os

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

HOLDER = 'iam-kira (Vijay Biradar)'
YEAR = '2026'


def sources():
    """Every file that ships or is part of the project's source."""
    patterns = ('*.py', '*.aura', 'tests/*.py', 'examples/*.aura')
    for pattern in patterns:
        for path in glob.glob(os.path.join(REPO, pattern)):
            yield path


def head(path, limit=500):
    with open(path, encoding='utf-8') as handle:
        return handle.read(limit)


def test_there_are_sources_to_check():
    assert len(list(sources())) >= 30


def test_every_source_file_carries_a_notice():
    missing = [os.path.relpath(p, REPO) for p in sources() if 'Copyright' not in head(p)]
    assert not missing, 'no copyright notice in: %s' % missing


def test_every_notice_names_the_holder_and_year():
    wrong = []
    for path in sources():
        text = head(path)
        if HOLDER not in text or YEAR not in text:
            wrong.append(os.path.relpath(path, REPO))
    assert not wrong, 'notice does not name %s %s in: %s' % (YEAR, HOLDER, wrong)


def test_every_notice_points_at_the_licence():
    silent = []
    for path in sources():
        if 'LICENSE' not in head(path):
            silent.append(os.path.relpath(path, REPO))
    assert not silent, 'notice does not reference LICENSE in: %s' % silent


def test_the_licence_and_notice_files_exist_and_agree():
    for name in ('LICENSE', 'NOTICE'):
        path = os.path.join(REPO, name)
        assert os.path.exists(path), '%s is missing' % name

        with open(path, encoding='utf-8') as handle:
            text = handle.read()
        assert HOLDER in text, '%s does not name the copyright holder' % name
        assert YEAR in text, '%s does not carry the year' % name


def test_the_notice_records_that_there_are_no_dependencies():
    """A NOTICE that lies about third-party code is worse than none."""
    with open(os.path.join(REPO, 'NOTICE'), encoding='utf-8') as handle:
        notice = handle.read()

    assert 'no runtime dependencies' in notice
    assert 'standard library' in notice
# Copyright (c) 2026 iam-kira (Vijay Biradar)
# Licensed under the MIT License. See LICENSE for the full text.

import aura

Q = '"'


def ev(source):
    result, error = aura.run('<stdin>', source, aura.new_symbol_table())
    if isinstance(result, list):
        result = result[-1] if result else None
    return result, error


def test_declaring_several_names_from_a_pile():
    result, error = ev('stash a, b = [1, 2]\n' + Q + '{a}{b}' + Q)
    assert error is None
    assert result.value == '12'


def test_three_names():
    result, error = ev('stash a, b, c = [1, 2, 3]\nc')
    assert error is None
    assert repr(result) == '3'


def test_assigning_without_stash_needs_existing_names():
    result, error = ev('stash a = 1\nstash b = 2\na, b = [b, a]\n' + Q + '{a}{b}' + Q)
    assert error is None
    assert result.value == '21'


def test_swapping_in_one_line():
    result, error = ev('stash a, b = [1, 2]\na, b = [b, a]\n' + Q + '{a}{b}' + Q)
    assert error is None
    assert result.value == '21'


def test_unpacking_a_chores_return_value():
    result, error = ev('chore pair() ong\nyeet [1, 2]\nbet\nstash x, y = pair()\n' + Q + '{x}-{y}' + Q)
    assert error is None
    assert result.value == '1-2'


def test_too_few_things_to_unpack():
    result, error = ev('stash a, b = [1]')
    assert result is None
    assert 'Need 2 things to unpack, got 1' in error.details


def test_too_many_things_to_unpack():
    result, error = ev('stash a, b = [1, 2, 3]')
    assert result is None
    assert 'Need 2 things to unpack, got 3' in error.details


def test_only_a_pile_can_be_unpacked():
    result, error = ev('stash a, b = 5')
    assert result is None
    assert 'Can only unpack a pile, got math' in error.details


def test_assigning_to_undeclared_names_is_rejected():
    result, error = ev('nope, other = [1, 2]')
    assert result is None
    assert "Cannot assign to undefined variable 'nope'" in error.details


def test_unpacked_values_are_copies():
    result, error = ev('stash x = [1, 2]\nstash a, b = x\nb = 9\nx')
    assert error is None
    assert repr(result) == '[1, 2]'


def test_a_single_name_still_works():
    result, error = ev('stash a = [1, 2]\na')
    assert error is None
    assert repr(result) == '[1, 2]'


def test_missing_name_after_a_comma_is_a_syntax_error():
    result, error = ev('stash a, = [1]')
    assert result is None
    assert 'Expected identifier' in error.details


# --- grind over pairs ---

def test_grind_over_a_bags_pairs():
    source = ('stash d = {' + Q + 'a' + Q + ': 1, ' + Q + 'b' + Q + ': 2}\n'
              'stash t = 0\ngrind k, v among d ong\nt += v\nbet\nt')
    result, error = ev(source)
    assert error is None
    assert repr(result) == '3'


def test_grind_over_pairs_binds_both_names():
    source = ('stash out = []\ngrind k, v among {' + Q + 'a' + Q + ': 1} ong\n'
              'out = stuff(out, ' + Q + '{k}={v}' + Q + ')\nbet\nout')
    result, error = ev(source)
    assert error is None
    assert repr(result) == '["a=1"]'


def test_grind_over_a_pile_of_piles():
    source = ('stash t = 0\ngrind a, b among [[1, 2], [3, 4]] ong\nt += a * b\nbet\nt')
    result, error = ev(source)
    assert error is None
    assert repr(result) == '14'


def test_grind_over_flat_values_with_two_names_is_an_error():
    result, error = ev('grind a, b among [1, 2] ong\n1\nbet')
    assert result is None
    assert 'Can only unpack a pile, got math' in error.details


def test_single_name_grind_over_a_bag_still_walks_labels():
    source = ('stash out = []\ngrind k among {' + Q + 'a' + Q + ': 1} ong\n'
              'out = stuff(out, k)\nbet\nout')
    result, error = ev(source)
    assert error is None
    assert repr(result) == '["a"]'


def test_grind_with_commas_requires_among():
    result, error = ev('grind a, b = 0 til 2 ong\n1\nbet')
    assert result is None
    assert "Expected 'among'" in error.details
# Copyright (c) 2026 iam-kira (Vijay Biradar)
# Licensed under the MIT License. See LICENSE for the full text.

import aura


def ev(source, filename='<stdin>'):
    result, error = aura.run(filename, source, aura.new_symbol_table())
    if isinstance(result, list):
        result = result[-1] if result else None
    return result, error


def test_runtime_error_records_call_frames():
    source = (
        'chore inner(n) ong\nyeet n / 0\nbet\n'
        'chore outer(n) ong\nyeet inner(n)\nbet\n'
        'outer(5)'
    )
    result, error = ev(source, 'prog.aura')
    assert result is None
    assert [name for name, _ in error.frames] == ['inner', 'outer']

    text = error.as_string()
    assert 'Traceback (most recent call last):' in text
    assert 'in outer' in text and 'in inner' in text
    assert 'Division by zero' in text


def test_error_without_a_call_has_no_traceback():
    result, error = ev('1 / 0')
    assert result is None
    assert error.frames == []
    assert 'Traceback' not in error.as_string()


def test_runaway_recursion_reports_a_language_error():
    result, error = ev('chore boom(n) ong\nyeet boom(n + 1)\nbet\nboom(0)')
    assert result is None
    assert 'Maximum call depth' in error.details


def test_traceback_is_capped_and_says_how_many_it_dropped():
    result, error = ev('chore boom(n) ong\nyeet boom(n + 1)\nbet\nboom(0)')
    assert len(error.frames) == aura.RTError.MAX_FRAMES
    assert error.frames_omitted > 0
    assert 'more frame(s)' in error.as_string()


def test_deeply_nested_expression_does_not_crash():
    result, error = ev('(' * 400 + '1' + ')' * 400)
    assert error is None
    assert repr(result) == '1'


def test_malformed_number_literals():
    for source in ('1.5.5', '1.', '1..2'):
        result, error = ev(source)
        assert result is None, source
        assert 'malformed number' in error.details, source


def test_valid_numbers_still_lex():
    for source, expected in (('42', '42'), ('3.14', '3.14'), ('0.5', '0.5')):
        result, error = ev(source)
        assert error is None, source
        assert repr(result) == expected, source


def test_error_reports_file_line_and_column():
    result, error = ev('stash x = 1\nx + $', 'prog.aura')
    assert result is None
    text = error.as_string()
    assert 'File prog.aura' in text
    assert 'line 2' in text
    assert 'col 5' in text
"""The docs must describe the language that actually exists.

test_docs.py proves the examples run. This proves the prose is not describing
some earlier version of aura - a keyword nobody documented, a builtin that was
renamed, or a count that drifted.

Copyright (c) 2026 iam-kira (Vijay Biradar)
Licensed under the MIT License. See LICENSE for the full text.
"""

import os
import re

import aura

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DOCS = ['README.md', 'CONTRIBUTING.md', os.path.join('editors', 'README.md'),
        os.path.join('docs', 'BOOK.md'), os.path.join('docs', 'LANGUAGE.md'),
        os.path.join('docs', 'ARCHITECTURE.md'), os.path.join('docs', 'README.md')]

# words the language used to use, which must never reappear in the docs
RETIRED = ['risky', 'shit']


def read(name):
    with open(os.path.join(REPO, name), encoding='utf-8') as handle:
        return handle.read()


def reference():
    """The two documents that claim to be complete."""
    return read(os.path.join('docs', 'BOOK.md')) + read(os.path.join('docs', 'LANGUAGE.md'))


def test_every_keyword_is_documented():
    body = reference()
    missing = [kw for kw in aura.KEYWORDS if not re.search(r'\b%s\b' % re.escape(kw), body)]
    assert not missing, 'keywords the reference never mentions: %s' % missing


def test_every_builtin_is_documented():
    body = reference()
    missing = [name for name in aura.BUILTINS if not re.search(r'\b%s\b' % re.escape(name), body)]
    assert not missing, 'builtins the reference never mentions: %s' % missing


def test_no_document_mentions_a_retired_word():
    offenders = []
    for name in DOCS:
        body = read(name)
        for word in RETIRED:
            if re.search(r'\b%s\b' % word, body, re.IGNORECASE):
                offenders.append('%s mentions "%s"' % (name, word))
    assert not offenders, offenders


def test_no_document_calls_yap_as_a_function():
    """yap is the string type; cook is the one that prints."""
    offenders = [name for name in DOCS if re.search(r'\byap\(', read(name))]
    assert not offenders, '%s uses yap( where it means cook(' % offenders


def test_stated_counts_match_reality():
    joined = '\n'.join(read(name) for name in DOCS)
    wrong = []

    for claimed in re.findall(r'(\d+) builtins', joined):
        if int(claimed) != len(aura.BUILTINS):
            wrong.append('claims %s builtins, actual %d' % (claimed, len(aura.BUILTINS)))

    for claimed in re.findall(r'(\d+) keywords', joined):
        if int(claimed) != len(aura.KEYWORDS):
            wrong.append('claims %s keywords, actual %d' % (claimed, len(aura.KEYWORDS)))

    assert not wrong, wrong


def test_every_error_kind_is_documented():
    body = reference()
    # 'runtime' is the fallback and deliberately has no table row
    missing = [k for k in aura.RTError.KINDS - {'runtime'}
               if not re.search(r'`%s`' % k, body)]
    assert not missing, 'error kinds the reference never mentions: %s' % missing


def test_the_docs_point_at_files_that_exist():
    """Ignores illustrative names like prog.aura that are examples, not files."""
    placeholders = {'prog.aura', 'lib.aura', 'f.aura', 'double.aura', 'app.aura',
                    'other.aura', 'notes.txt', 'bad.aura', 'p.aura'}
    missing = []

    for name in DOCS:
        folder = os.path.dirname(name)
        for target in set(re.findall(r'\b[\w./-]+\.(?:aura|py|json|yml)\b', read(name))):
            if target in placeholders or target.startswith(('http', 'source.')):
                continue
            if 'github.com' in target:   # badge URLs, not local paths
                continue
            options = [os.path.join(REPO, target), os.path.join(REPO, folder, target)]
            if not any(os.path.exists(o) for o in options):
                missing.append('%s -> %s' % (name, target))

    assert not missing, missing
"""Every aura snippet in the docs has to actually run.

Docs drift silently; this makes them fail loudly instead.

The convention: a ```text fence holds runnable aura, so it gets executed here.
Notation - grammars, pipeline diagrams, word listings - uses a bare fence.

Copyright (c) 2026 iam-kira (Vijay Biradar)
Licensed under the MIT License. See LICENSE for the full text.
"""

import io
import os
import re

import aura

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# every markdown file in the repo root and docs/, so a new one is covered by default
DOCS = ['README.md', 'CONTRIBUTING.md'] + sorted(
    os.path.join('docs', name)
    for name in os.listdir(os.path.join(REPO, 'docs'))
    if name.endswith('.md')
)

FENCE = re.compile(r'```text\n(.*?)```', re.DOTALL)

# Snippets that are output transcripts or deliberate fragments, not programs.
SKIP_MARKERS = ('shell :>', 'Traceback (most recent call last):', 'File ',
                'statements ->', '# everything:', 'source text')


def snippets():
    for name in DOCS:
        path = os.path.join(REPO, name)
        text = io.open(path, encoding='utf-8').read()
        for i, block in enumerate(FENCE.findall(text)):
            if any(marker in block for marker in SKIP_MARKERS):
                continue
            if not block.strip():
                continue
            yield name, i, block


def test_there_are_snippets_to_check():
    assert len(list(snippets())) >= 8


def test_every_doc_snippet_runs():
    failures = []

    for name, index, block in snippets():
        table = aura.new_symbol_table()
        # snippets often reference names a nearby paragraph set up
        for helper in ('stash x = 7', 'stash n = 3', 'stash name = "ana"',
                       'stash scores = {"ana": 3}', 'stash xs = [1, 2, 3]',
                       'chore lastchar(s) ong yeet s[-1] bet',
                       'chore bounds() ong yeet [1, 9] bet',
                       'stash grid = [[1, 2], [3, 4]]', 'stash i = 0',
                       'stash b = {"x": 1}',
                       'stash path = "no-such-file.txt"',
                       'stash player = {"name": "ana", "score": 0}',
                       'stash score = 7', 'stash n = 3', 'stash count = 0',
                       'stash scores = {"ana": 3}',
                       'stash names = ["ana", "bo"]', 'stash points = [1, 2]'):
            aura.run('<setup>', helper, table)

        _, error = aura.run(f'{name}#{index}', block, table)
        if isinstance(error, aura.BounceError):
            continue  # a snippet showing bounce() is behaving correctly
        if error:
            failures.append(f'{name} snippet {index}: {error.details}\n{block.strip()[:200]}')

    assert not failures, '\n\n'.join(failures)
# Copyright (c) 2026 iam-kira (Vijay Biradar)
# Licensed under the MIT License. See LICENSE for the full text.

import aura

Q = '"'


def ev(source):
    result, error = aura.run('<stdin>', source, aura.new_symbol_table())
    if isinstance(result, list):
        result = result[-1] if result else None
    return result, error


BAG = 'stash d = {' + Q + 'a' + Q + ': 1}\n'


def test_dot_reads_a_label():
    result, error = ev(BAG + 'd.a')
    assert error is None
    assert repr(result) == '1'


def test_dot_is_the_same_as_bracket_lookup():
    result, error = ev(BAG + 'd.a == d[' + Q + 'a' + Q + ']')
    assert error is None
    assert repr(result) == '1'


def test_dot_adds_a_label():
    result, error = ev(BAG + 'd.b = 2\nd')
    assert error is None
    assert repr(result) == '{"a": 1, "b": 2}'


def test_compound_assignment_through_a_dot():
    result, error = ev(BAG + 'd.a += 5\nd.a')
    assert error is None
    assert repr(result) == '6'


def test_calling_a_chore_through_a_dot():
    result, error = ev('chore f() ong\nyeet 7\nbet\nstash d = {' + Q + 'go' + Q + ': f}\nd.go()')
    assert error is None
    assert repr(result) == '7'


def test_dots_nest():
    source = ('stash d = {' + Q + 'in' + Q + ': {' + Q + 'deep' + Q + ': 3}}\nd.in.deep')
    result, error = ev(source)
    assert error is None
    assert repr(result) == '3'


def test_nested_dot_assignment():
    source = ('stash d = {' + Q + 'in' + Q + ': {' + Q + 'deep' + Q + ': 3}}\nd.in.deep = 9\nd.in.deep')
    result, error = ev(source)
    assert error is None
    assert repr(result) == '9'


def test_a_keyword_may_be_a_label():
    result, error = ev('stash d = {' + Q + 'chore' + Q + ': 1}\nd.chore')
    assert error is None
    assert repr(result) == '1'


def test_a_missing_label_still_reports():
    result, error = ev(BAG + 'd.nope')
    assert result is None
    assert 'No label' in error.details


def test_a_dot_with_no_label_is_a_syntax_error():
    result, error = ev(BAG + 'd.')
    assert result is None
    assert "Expected a label after '.'" in error.details


def test_dotting_a_pile_explains_itself():
    result, error = ev('stash xs = [1]\nxs.foo')
    assert result is None
    assert 'A pile is indexed by whole maths, not labels' in error.details


def test_float_literals_are_unaffected():
    for source, expected in (('1.5', '1.5'), ('0.25 * 4', '1'), ('1.5 + 1.5', '3')):
        result, error = ev(source)
        assert error is None, source
        assert repr(result) == expected, source


def test_dot_access_on_an_object_bag():
    source = (
        'chore counter() ong\n'
        'stash n = 0\n'
        'chore bump() ong\nn += 1\nyeet n\nbet\n'
        'yeet {' + Q + 'bump' + Q + ': bump}\n'
        'bet\n'
        'stash c = counter()\nc.bump()\nc.bump()'
    )
    result, error = ev(source)
    assert error is None
    assert repr(result) == '2'
"""The VS Code grammar lists keywords and builtins by hand, so it drifts.

These tests fail the moment the language grows a word the grammar has not
heard of, or the grammar keeps one the language dropped.

Copyright (c) 2026 iam-kira (Vijay Biradar)
Licensed under the MIT License. See LICENSE for the full text.
"""

import json
import os
import re

import aura

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GRAMMAR = os.path.join(REPO, 'editors', 'vscode', 'syntaxes', 'aura.tmLanguage.json')


def load():
    with open(GRAMMAR, encoding='utf-8') as handle:
        return json.load(handle)


def words_in(pattern):
    """Pull the alternatives out of a \\b(a|b|c)\\b style match."""
    inner = re.search(r'\(([^)]*)\)', pattern)
    assert inner, pattern
    return set(inner.group(1).split('|'))


def collect(node, found):
    if isinstance(node, dict):
        for key, value in node.items():
            if key in ('match', 'begin', 'end') and isinstance(value, str):
                found.append(value)
            else:
                collect(value, found)
    elif isinstance(node, list):
        for item in node:
            collect(item, found)
    return found


def test_grammar_is_valid_json_with_compilable_patterns():
    for pattern in collect(load(), []):
        re.compile(pattern)


def test_grammar_knows_every_keyword():
    patterns = collect(load()['repository']['keyword'], [])
    highlighted = set()
    for pattern in patterns:
        highlighted |= words_in(pattern)

    missing = set(aura.KEYWORDS) - highlighted
    extra = highlighted - set(aura.KEYWORDS)

    assert not missing, f'grammar does not highlight: {sorted(missing)}'
    assert not extra, f'grammar highlights words the language dropped: {sorted(extra)}'


def test_grammar_knows_every_builtin():
    highlighted = words_in(load()['repository']['builtin']['match'])

    missing = set(aura.BUILTINS) - highlighted
    extra = highlighted - set(aura.BUILTINS)

    assert not missing, f'grammar does not highlight: {sorted(missing)}'
    assert not extra, f'grammar highlights builtins that do not exist: {sorted(extra)}'


def test_extension_declares_the_aura_extension():
    with open(os.path.join(REPO, 'editors', 'vscode', 'package.json'), encoding='utf-8') as handle:
        package = json.load(handle)

    language = package['contributes']['languages'][0]
    assert language['extensions'] == ['.aura']
    assert package['contributes']['grammars'][0]['scopeName'] == load()['scopeName']


def test_language_configuration_matches_the_block_words():
    path = os.path.join(REPO, 'editors', 'vscode', 'language-configuration.json')
    with open(path, encoding='utf-8') as handle:
        config = json.load(handle)

    rules = config['indentationRules']
    assert 'ong' in rules['increaseIndentPattern']
    for word in ('bet', 'whatever', 'orfr', 'whoops'):
        assert word in rules['decreaseIndentPattern'], word
        assert word in aura.KEYWORDS, word
"""Errors should show the offending line, not just describe it.

Copyright (c) 2026 iam-kira (Vijay Biradar)
Licensed under the MIT License. See LICENSE for the full text.
"""

import aura

Q = '"'


def error_text(source, filename='prog.aura'):
    _, error = aura.run(filename, source, aura.new_symbol_table())
    assert error is not None, source
    return error.as_string()


def lines_of(source, **kwargs):
    return error_text(source, **kwargs).splitlines()


def test_the_offending_line_is_shown():
    out = lines_of('stash x = 1\nstash y = x + $ + 2')
    assert 'Illegal Character' in out[0]
    assert 'line 2, col 15' in out[1]
    assert out[2] == '  stash y = x + $ + 2'


def test_a_caret_points_at_the_column():
    out = lines_of('stash x = 1\nstash y = x + $ + 2')
    caret = out[3]
    assert set(caret.strip()) == {'^'}
    # the caret must sit under the offending character
    assert out[2][len(caret.rstrip('^'))] == '$'


def test_the_caret_spans_a_whole_name():
    out = lines_of('stash t = 0\nt += nope')
    assert out[2] == '  t += nope'
    assert out[3].strip() == '^' * len('nope')


def test_tabs_do_not_shift_the_caret():
    source = 'grind i = 0 til 2 ong\n' + chr(9) + 'nope\nbet'
    out = lines_of(source)
    # the tab renders as four spaces in both the line and the caret row
    assert out[2] == '      nope'
    assert out[3].index('^') == out[2].index('nope')


def test_an_error_at_the_end_of_a_line_still_shows_it():
    out = lines_of('fr 1 ong\ncook(1)')
    assert "Expected 'bet'" in out[0]
    assert out[2] == '  cook(1)'


def test_an_error_past_the_last_line_shows_no_excerpt():
    # the trailing newline puts EOF on a line that does not exist
    out = lines_of('fr 1 ong\ncook(1)\n')
    assert "Expected 'bet'" in out[0]
    assert len(out) == 2


def test_a_traceback_still_leads_the_message():
    source = ('chore inner(n) ong\nyeet n / 0\nbet\n'
              'chore outer() ong\nyeet inner(5)\nbet\nouter()')
    out = lines_of(source)

    assert out[0] == 'Traceback (most recent call last):'
    assert 'in outer' in out[1]
    assert 'in inner' in out[2]
    assert 'Division by zero' in out[3]
    assert out[5] == '  yeet n / 0'
    assert '^' in out[6]


def test_runtime_errors_show_the_line_too():
    out = lines_of('stash xs = [1]\nxs[9]')
    assert 'out of range' in out[0]
    assert out[2] == '  xs[9]'


def test_the_excerpt_survives_a_source_with_no_trailing_newline():
    out = lines_of('nope')
    assert out[2] == '  nope'
    assert out[3].strip() == '^' * len('nope')


def test_an_error_in_a_summoned_file_shows_that_files_line(tmp_path):
    (tmp_path / 'lib.aura').write_text('stash bad = 1 / 0\n', encoding='utf-8')
    main = tmp_path / 'main.aura'
    main.write_text('summon(' + Q + 'lib.aura' + Q + ')\n', encoding='utf-8')

    text = error_text(main.read_text(encoding='utf-8'), filename=str(main))
    assert 'Division by zero' in text
    assert 'stash bad = 1 / 0' in text


def test_excerpt_is_empty_when_there_is_no_source():
    error = aura.RTError(None, None, 'nowhere', kind='runtime')
    assert error.excerpt() == ''
# Copyright (c) 2026 iam-kira (Vijay Biradar)
# Licensed under the MIT License. See LICENSE for the full text.

import ast
import os

import aura

Q = '"'
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def ev(source):
    result, error = aura.run('<stdin>', source, aura.new_symbol_table())
    if isinstance(result, list):
        result = result[-1] if result else None
    return result, error


def kind_of(source):
    _, error = ev(source)
    assert error is not None, source
    return error.kind


CASES = {
    'math': ['1 / 0', '1 % 0', '0 ^ -1', 'grind i = 1 til 2 by 0 ong\n1\nbet'],
    'name': ['nope', 'nope = 1', 'chore f() ong\nnope = 1\nbet\nf()'],
    'index': ['[1][9]', '[1][' + Q + 'a' + Q + ']', 'stash n = 5\nn[0]',
              'stash s = ' + Q + 'a' + Q + '\ns[0] = ' + Q + 'b' + Q],
    'label': ['{}[' + Q + 'z' + Q + ']', '{}[[]]'],
    'type': [Q + 'a' + Q + ' + 1', 'stash n = 5\nn()', 'chunk(5)', 'smol(' + Q + 'a' + Q + ')',
             'grind x among 5 ong\n1\nbet'],
    'arity': ['cook(1, 2)', 'chore f(a) ong\n1\nbet\nf()'],
    'flow': ['bail', 'skip', 'yeet 1'],
    'unpack': ['stash a, b = [1]', 'stash a, b = 5'],
    'depth': ['chore f() ong\nyeet f()\nbet\nf()'],
    'custom': ['oops ' + Q + 'boom' + Q],
    'file': ['slurp(' + Q + 'definitely-not-here.txt' + Q + ')',
             'summon(' + Q + 'definitely-not-here.aura' + Q + ')'],
}


def test_every_case_reports_its_kind():
    wrong = []
    for expected, sources in CASES.items():
        for source in sources:
            actual = kind_of(source)
            if actual != expected:
                wrong.append(f'{source!r}: expected {expected}, got {actual}')
    assert not wrong, '\n'.join(wrong)


def test_kinds_are_from_the_known_set():
    for sources in CASES.values():
        for source in sources:
            assert kind_of(source) in aura.RTError.KINDS, source


def test_the_whoops_bag_carries_the_kind():
    source = ('sus ong\n1 / 0\nwhoops e ong\ne.kind\nbet')
    result, error = ev(source)
    assert error is None
    assert result.value == 'math'


def test_aura_code_can_branch_on_the_kind():
    source = (
        'chore describe(thunk) ong\n'
        'sus ong\n'
        'thunk()\n'
        'yeet ' + Q + 'fine' + Q + '\n'
        'whoops e ong\n'
        'fr e.kind == ' + Q + 'math' + Q + ' ong\n'
        'yeet ' + Q + 'bad sums' + Q + '\n'
        'orfr e.kind == ' + Q + 'file' + Q + ' ong\n'
        'yeet ' + Q + 'bad file' + Q + '\n'
        'bet\n'
        'yeet ' + Q + 'something else' + Q + '\n'
        'bet\n'
        'bet\n'
        'chore divzero() ong\nyeet 1 / 0\nbet\n'
        'chore missing() ong\nyeet slurp(' + Q + 'nope.txt' + Q + ')\nbet\n'
        'chore fine() ong\nyeet 1\nbet\n'
        '[describe(divzero), describe(missing), describe(fine)]'
    )
    result, error = ev(source)
    assert error is None
    assert repr(result) == '["bad sums", "bad file", "fine"]'


def test_the_whoops_bag_still_carries_why_file_and_line():
    result, error = ev('sus ong\n\n1 / 0\nwhoops e ong\ne\nbet')
    assert error is None
    assert repr(result) == (
        '{"why": "Division by zero", "kind": "math", "file": "<stdin>", "line": 3}'
    )


def test_every_error_site_in_the_source_declares_a_kind():
    """A new RTError with no kind would silently report as 'runtime'."""
    with open(os.path.join(REPO, 'aura.py'), encoding='utf-8') as handle:
        tree = ast.parse(handle.read())

    untagged = [
        node.lineno
        for node in ast.walk(tree)
        if isinstance(node, ast.Call)
        and isinstance(node.func, ast.Name)
        and node.func.id == 'RTError'
        and not any(keyword.arg == 'kind' for keyword in node.keywords)
    ]

    assert not untagged, f'RTError without a kind at lines: {untagged}'
# Copyright (c) 2026 iam-kira (Vijay Biradar)
# Licensed under the MIT License. See LICENSE for the full text.

import aura


def test_position_resets_column_on_newline():
    pos = aura.Position(0, 0, 5, '<stdin>', 'a\n')
    pos.advance('\n')

    assert pos.line == 1
    assert pos.col == 0


def test_token_repr_keeps_zero_values():
    token_int = aura.Token(aura.TT_INT, 0)
    token_float = aura.Token(aura.TT_FLOAT, 0.0)

    assert repr(token_int) == 'INT:0'
    assert repr(token_float) == 'FLOAT:0.0'


def test_invalid_syntax_error_from_incomplete_input():
    result, error = aura.run('<stdin>', '1 +')

    assert result is None
    assert isinstance(error, aura.InvalidSyntaxError)
    assert 'Invalid Syntax' in error.as_string()


def test_if_missing_then_is_syntax_error():
    result, error = aura.run('<stdin>', 'fr 1\n  2\nbet')

    assert result is None
    assert "Expected 'ong'" in error.as_string()


def test_if_missing_end_is_syntax_error():
    result, error = aura.run('<stdin>', 'fr 1 ong\n  2')

    assert result is None
    assert "Expected 'bet'" in error.as_string()


def test_while_missing_then_is_syntax_error():
    result, error = aura.run('<stdin>', 'keep 1\n  2\nbet')

    assert result is None
    assert "Expected 'ong'" in error.as_string()


def test_call_with_wrong_arg_count_is_runtime_error():
    result, error = aura.run('<stdin>', 'chore add(a, b) ong\n  a + b\nbet\nadd(1)')

    assert result is None
    assert 'takes 2 argument(s), got 1' in error.as_string()


def test_calling_a_number_is_runtime_error():
    result, error = aura.run('<stdin>', 'stash x = 3\nx(1)')

    assert result is None
    assert 'is not a chore' in error.as_string()


def test_arithmetic_on_a_function_is_runtime_error():
    result, error = aura.run('<stdin>', 'chore f() ong\n  1\nbet\nf + 1')

    assert result is None
    assert 'Illegal operation' in error.as_string()
# Copyright (c) 2026 iam-kira (Vijay Biradar)
# Licensed under the MIT License. See LICENSE for the full text.

import os

import aura

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def run_example(name, capsys):
    exit_code = aura.main([os.path.join(REPO, name)])
    return exit_code, capsys.readouterr().out.splitlines()


def test_calculator_example(capsys):
    """A calculator written in aura - the language exercising itself."""
    exit_code, out = run_example(os.path.join('examples', 'calc.aura'), capsys)

    assert exit_code == 0
    assert out == [
        '1 + 2 * 3 = 7',
        '(1 + 2) * 3 = 9',
        '2 ^ 3 ^ 2 = 512',
        '-4 + 10 = 6',
        '7 % 4 = 3',
        '10 / 4 = 2.5',
        '2 * (3 + 4) - 5 = 9',
        '1.5 * 4 = 6',
        '((2)) = 2',
        '1 / 0 -> nope: Division by zero',
        '2 + -> nope: expected a number, got end',
        "4 $ 2 -> nope: I do not know what '$' is",
        '(1 + 2 -> nope: missing )',
    ]


def test_word_count_example_reads_a_file(tmp_path, capsys):
    sample = tmp_path / 'sample.txt'
    sample.write_text('one two three\nfour five\n', encoding='utf-8')

    exit_code = aura.main([os.path.join(REPO, 'examples', 'wc.aura'), str(sample)])
    out = capsys.readouterr().out.strip()

    assert exit_code == 0
    assert '5 words' in out
    assert '24 chars' in out


def test_word_count_example_walks_a_folder(tmp_path, capsys):
    (tmp_path / 'a.txt').write_text('one two\n', encoding='utf-8')
    (tmp_path / 'b.txt').write_text('three\n', encoding='utf-8')
    (tmp_path / 'sub').mkdir()

    exit_code = aura.main([os.path.join(REPO, 'examples', 'wc.aura'), str(tmp_path)])
    out = capsys.readouterr().out.strip().splitlines()

    assert exit_code == 0
    assert len(out) == 2, out
    assert any('a.txt' in line and '2 words' in line for line in out)
    assert any('b.txt' in line and '1 words' in line for line in out)


def test_word_count_example_complains_with_no_file(capsys):
    exit_code = aura.main([os.path.join(REPO, 'examples', 'wc.aura')])

    assert exit_code == 2
    assert 'give me a file' in capsys.readouterr().out


def test_word_count_example_survives_a_missing_file(tmp_path, capsys):
    exit_code = aura.main([os.path.join(REPO, 'examples', 'wc.aura'), str(tmp_path / 'gone.txt')])

    assert exit_code == 0
    assert 'not there' in capsys.readouterr().out


# --- the JSON parser ---

def test_json_example_parses_a_document(tmp_path, capsys):
    doc = tmp_path / 'doc.json'
    doc.write_text('{"name": "ana", "score": 42, "tags": ["a", "b"], '
                   '"ok": true, "nil": null}', encoding='utf-8')

    exit_code = aura.main([os.path.join(REPO, 'examples', 'json.aura'), str(doc)])
    out = capsys.readouterr().out

    assert exit_code == 0
    assert '"name": "ana"' in out
    assert '"nil": ghosted' in out      # JSON null survives as ghosted
    assert 'score: math = 42' in out
    assert 'tags: pile of 2' in out
    assert 'nil: null' in out


def test_json_example_handles_nesting(tmp_path, capsys):
    doc = tmp_path / 'nested.json'
    doc.write_text('{"a": [1, [2, {"b": 3}]]}', encoding='utf-8')

    assert aura.main([os.path.join(REPO, 'examples', 'json.aura'), str(doc)]) == 0
    assert '[1, [2, {"b": 3}]]' in capsys.readouterr().out


def test_json_example_reports_bad_input(tmp_path, capsys):
    doc = tmp_path / 'bad.json'
    doc.write_text('{"a": }', encoding='utf-8')

    exit_code = aura.main([os.path.join(REPO, 'examples', 'json.aura'), str(doc)])
    assert exit_code == 1
    assert 'unexpected' in capsys.readouterr().out


def test_json_example_wants_a_file(capsys):
    exit_code = aura.main([os.path.join(REPO, 'examples', 'json.aura')])
    assert exit_code == 2
    assert 'give me a .json file' in capsys.readouterr().out


def test_json_example_reports_a_missing_file(tmp_path, capsys):
    exit_code = aura.main([os.path.join(REPO, 'examples', 'json.aura'),
                           str(tmp_path / 'gone.json')])
    assert exit_code == 1
    assert 'Cannot slurp' in capsys.readouterr().out
# Copyright (c) 2026 iam-kira (Vijay Biradar)
# Licensed under the MIT License. See LICENSE for the full text.

import os

import aura

Q = '"'


def ev(source, filename='<stdin>'):
    result, error = aura.run(filename, source, aura.new_symbol_table())
    if isinstance(result, list):
        result = result[-1] if result else None
    return result, error


def cook(text):
    return Q + str(text).replace(chr(92), chr(92) * 2) + Q


# --- reading and writing ---

def test_spill_then_slurp_round_trips(tmp_path):
    target = tmp_path / 'note.txt'
    source = ('spill(' + cook(target) + ', ' + Q + 'hello' + Q + ')\n'
              'slurp(' + cook(target) + ')')
    result, error = ev(source)

    assert error is None
    assert result.value == 'hello'
    assert target.read_text(encoding='utf-8') == 'hello'


def test_spill_reports_how_much_it_wrote(tmp_path):
    target = tmp_path / 'note.txt'
    result, error = ev('spill(' + cook(target) + ', ' + Q + 'abcde' + Q + ')')
    assert error is None
    assert repr(result) == '5'


def test_spill_overwrites_and_dribble_appends(tmp_path):
    target = tmp_path / 'log.txt'
    source = ('spill(' + cook(target) + ', ' + Q + 'a' + Q + ')\n'
              'spill(' + cook(target) + ', ' + Q + 'b' + Q + ')\n'
              'dribble(' + cook(target) + ', ' + Q + 'c' + Q + ')\n'
              'slurp(' + cook(target) + ')')
    result, error = ev(source)

    assert error is None
    assert result.value == 'bc'


def test_slurping_a_missing_file_is_a_runtime_error(tmp_path):
    result, error = ev('slurp(' + cook(tmp_path / 'nope.txt') + ')')
    assert result is None
    assert 'Cannot slurp' in error.details


def test_slurp_error_is_catchable(tmp_path):
    source = ('sus ong\nslurp(' + cook(tmp_path / 'nope.txt') + ')\n'
              'whoops e ong\n' + Q + 'handled' + Q + '\nbet')
    result, error = ev(source)
    assert error is None
    assert result.value == 'handled'


def test_isthere_checks_a_path(tmp_path):
    target = tmp_path / 'here.txt'
    target.write_text('x', encoding='utf-8')

    result, error = ev('isthere(' + cook(target) + ')')
    assert error is None
    assert repr(result) == '1'

    result, error = ev('isthere(' + cook(tmp_path / 'gone.txt') + ')')
    assert error is None
    assert repr(result) == '0'


def test_paths_must_be_yaps():
    for source in ('slurp(5)', 'isthere(5)', 'spill(5, ' + Q + 'x' + Q + ')'):
        result, error = ev(source)
        assert result is None, source
        assert 'needs a yap' in error.details, source


def test_spilled_text_must_be_a_yap(tmp_path):
    result, error = ev('spill(' + cook(tmp_path / 'x.txt') + ', 5)')
    assert result is None
    assert 'needs a yap' in error.details


def test_a_program_can_read_its_own_source(tmp_path, capsys):
    program = tmp_path / 'self.aura'
    program.write_text('cook(howmany(slurp(handed()[0])) > 0)\n', encoding='utf-8')

    assert aura.main([str(program), str(program)]) == 0
    assert capsys.readouterr().out == '1\n'


# --- bounce ---

def test_bounce_sets_the_exit_code(tmp_path, capsys):
    program = tmp_path / 'p.aura'
    program.write_text('cook("before")\nbounce(3)\ncook("after")\n', encoding='utf-8')

    assert aura.main([str(program)]) == 3
    assert capsys.readouterr().out == 'before\n'


def test_bounce_defaults_to_zero(tmp_path):
    program = tmp_path / 'p.aura'
    program.write_text('bounce()\n', encoding='utf-8')
    assert aura.main([str(program)]) == 0


def test_bounce_is_not_catchable():
    result, error = ev('sus ong\nbounce(2)\nwhoops e ong\n' + Q + 'caught' + Q + '\nbet')
    assert result is None
    assert isinstance(error, aura.BounceError)
    assert error.code == 2


def test_bounce_code_must_be_a_math():
    result, error = ev('bounce(' + Q + 'x' + Q + ')')
    assert result is None
    assert "'bounce' needs a math" in error.details


def test_bounce_stops_a_loop_and_the_program():
    result, error = ev('stash n = 0\ngrind i = 0 til 10 ong\nn += 1\nbounce(1)\nbet\nn')
    assert result is None
    assert isinstance(error, aura.BounceError)


# --- handed ---

def test_handed_is_empty_when_run_directly():
    aura.SCRIPT_ARGS = []
    result, error = ev('handed()')
    assert error is None
    assert repr(result) == '[]'


# --- directories ---

def test_rummage_lists_a_folder(tmp_path):
    (tmp_path / 'b.txt').write_text('b', encoding='utf-8')
    (tmp_path / 'a.txt').write_text('a', encoding='utf-8')

    result, error = ev('rummage(' + cook(tmp_path) + ')')
    assert error is None
    assert repr(result) == '["a.txt", "b.txt"]'


def test_rummage_defaults_to_here():
    result, error = ev('gotit(rummage(), ' + Q + 'aura.py' + Q + ')')
    assert error is None
    assert repr(result) == '1'


def test_rummage_of_a_missing_folder_reports_a_file_error(tmp_path):
    result, error = ev('rummage(' + cook(tmp_path / 'gone') + ')')
    assert result is None
    assert error.kind == 'file'
    assert 'Cannot rummage' in error.details


def test_isfolder_tells_folders_from_files(tmp_path):
    (tmp_path / 'f.txt').write_text('x', encoding='utf-8')

    result, error = ev('isfolder(' + cook(tmp_path) + ')')
    assert error is None
    assert repr(result) == '1'

    result, error = ev('isfolder(' + cook(tmp_path / 'f.txt') + ')')
    assert error is None
    assert repr(result) == '0'


def test_stitch_joins_with_forward_slashes():
    result, error = ev('stitch(' + Q + 'a' + Q + ', ' + Q + 'b' + Q + ', ' + Q + 'c.txt' + Q + ')')
    assert error is None
    assert result.value == 'a/b/c.txt'


def test_stitch_takes_one_part_or_many():
    result, error = ev('stitch(' + Q + 'only' + Q + ')')
    assert error is None
    assert result.value == 'only'


def test_stitch_needs_yaps():
    result, error = ev('stitch(1)')
    assert result is None
    assert error.kind == 'type'
    assert "'stitch' needs yaps" in error.details


def test_stitch_output_can_be_slurped(tmp_path):
    folder = tmp_path / 'sub'
    folder.mkdir()
    (folder / 'note.txt').write_text('found me', encoding='utf-8')

    source = ('slurp(stitch(' + cook(folder) + ', ' + Q + 'note.txt' + Q + '))')
    result, error = ev(source)
    assert error is None
    assert result.value == 'found me'
"""ghosted is a value of its own, not another spelling of 0.

Copyright (c) 2026 iam-kira (Vijay Biradar)
Licensed under the MIT License. See LICENSE for the full text.
"""

import aura

Q = '"'


def ev(source):
    result, error = aura.run('<stdin>', source, aura.new_symbol_table())
    if isinstance(result, list):
        result = result[-1] if result else None
    return result, error


def check(cases):
    for source, expected in cases.items():
        result, error = ev(source)
        assert error is None, (source, error.details if error else None)
        assert repr(result) == expected, (source, repr(result), expected)


def test_it_prints_as_itself():
    check({'ghosted': 'ghosted'})


def test_it_is_not_zero_and_not_false():
    check({
        'ghosted == 0': '0',
        'ghosted == cringe': '0',
        'ghosted != 0': '1',
        '0 == ghosted': '0',
        'cringe == ghosted': '0',
    })


def test_it_equals_only_itself():
    check({'ghosted == ghosted': '1', 'ghosted != ghosted': '0'})


def test_it_is_not_equal_to_other_types():
    check({
        'ghosted == ' + Q + Q: '0',
        'ghosted == []': '0',
        'ghosted == {}': '0',
        Q + Q + ' == ghosted': '0',
        '[] == ghosted': '0',
    })


def test_it_is_falsy():
    check({
        'nah ghosted': '1',
        'ghosted also 1': '0',
        'ghosted orelse 5': '1',
    })

    result, error = ev('fr ghosted ong\n1\nwhatever\n2\nbet')
    assert error is None
    assert repr(result) == '2'


def test_whatis_tells_the_truth_about_it():
    check({'whatis(ghosted)': '"ghosted"'})


def test_is_ghosted_asks_the_question():
    check({
        'is_ghosted(ghosted)': '1',
        'is_ghosted(0)': '0',
        'is_ghosted(' + Q + Q + ')': '0',
        'is_ghosted([])': '0',
        'is_math(ghosted)': '0',
    })


def test_arithmetic_on_it_is_an_error_not_a_silent_zero():
    """The whole point: a missing value surfaces where it went missing."""
    for source in ('ghosted + 1', '1 + ghosted', 'ghosted * 2', 'ghosted - 1', 'ghosted / 1'):
        result, error = ev(source)
        assert result is None, source
        assert error.kind == 'type', source
        assert 'ghosted' in error.details, source


def test_ordering_it_is_an_error():
    for source in ('ghosted < 1', 'ghosted > 1', '1 <= ghosted'):
        result, error = ev(source)
        assert result is None, source
        assert error.kind == 'type', source


def test_it_lives_happily_in_piles_and_bags():
    check({
        '[ghosted]': '[ghosted]',
        '[ghosted] == [ghosted]': '1',
        '[ghosted] == [0]': '0',
        '{' + Q + 'a' + Q + ': ghosted}': '{"a": ghosted}',
        'howmany([ghosted, ghosted])': '2',
    })


def test_a_bag_can_hold_it_and_give_it_back():
    result, error = ev('stash b = {}\nb.missing = ghosted\nis_ghosted(b.missing)')
    assert error is None
    assert repr(result) == '1'


def test_it_can_be_stashed_and_returned():
    check({'stash x = ghosted\nx': 'ghosted'})

    result, error = ev('chore nothing() ong\nyeet ghosted\nbet\nis_ghosted(nothing())')
    assert error is None
    assert repr(result) == '1'


def test_yapify_names_it():
    check({'yapify(ghosted)': '"ghosted"'})


def test_it_cannot_be_a_bag_label():
    result, error = ev('stash b = {}\nb[ghosted] = 1')
    assert result is None
    assert error.kind == 'label'


def test_it_is_not_indexable_and_has_no_length():
    for source in ('ghosted[0]', 'howmany(ghosted)'):
        result, error = ev(source)
        assert result is None, source
        assert error.kind in ('index', 'type'), source


def test_it_survives_a_round_trip_through_a_chore():
    source = ('chore pass_through(x) ong\nyeet x\nbet\n'
              '[is_ghosted(pass_through(ghosted)), is_ghosted(pass_through(0))]')
    result, error = ev(source)
    assert error is None
    assert repr(result) == '[1, 0]'


def test_missing_and_zero_are_finally_distinguishable():
    """The reason this type exists at all."""
    source = (
        'stash scores = {' + Q + 'ana' + Q + ': 0, ' + Q + 'bo' + Q + ': ghosted}\n'
        'chore describe(v) ong\n'
        'fr is_ghosted(v) ong\n'
        'yeet ' + Q + 'did not play' + Q + '\n'
        'bet\n'
        'yeet ' + Q + 'scored nothing' + Q + '\n'
        'bet\n'
        '[describe(scores.ana), describe(scores.bo)]'
    )
    result, error = ev(source)
    assert error is None
    assert repr(result) == '["scored nothing", "did not play"]'
# Copyright (c) 2026 iam-kira (Vijay Biradar)
# Licensed under the MIT License. See LICENSE for the full text.

import aura

Q = '"'

PRELUDE = (
    'chore dbl(n) ong\nyeet n * 2\nbet\n'
    'chore odd(n) ong\nyeet n % 2 == 1\nbet\n'
    'chore add(a, b) ong\nyeet a + b\nbet\n'
    'chore lastchar(s) ong\nyeet s[-1]\nbet\n'
)


def ev(source, prelude=True):
    text = (PRELUDE if prelude else '') + source
    result, error = aura.run('<stdin>', text, aura.new_symbol_table())
    if isinstance(result, list):
        result = result[-1] if result else None
    return result, error


def check(cases):
    for source, expected in cases.items():
        result, error = ev(source)
        assert error is None, (source, error.details if error else None)
        assert repr(result) == expected, source


def test_eachof_maps():
    check({'eachof([1, 2, 3], dbl)': '[2, 4, 6]', 'eachof([], dbl)': '[]'})


def test_eachof_works_with_a_builtin():
    check({'eachof([' + Q + 'a' + Q + '], shout)': '["A"]'})


def test_keepif_filters():
    check({
        'keepif([1, 2, 3, 4, 5], odd)': '[1, 3, 5]',
        'keepif([2, 4], odd)': '[]',
    })


def test_smoosh_reduces():
    check({
        'smoosh([1, 2, 3, 4], add)': '10',
        'smoosh([5], add)': '5',
        'smoosh([1, 2], add, 10)': '13',
    })


def test_smoosh_of_an_empty_pile_needs_a_start():
    check({'smoosh([], add, 0)': '0'})

    result, error = ev('smoosh([], add)')
    assert result is None
    assert 'needs a starting value' in error.details


def test_sortof_still_sorts_without_a_chore():
    check({'sortof([3, 1, 2])': '[1, 2, 3]'})


def test_sortof_takes_a_key_chore():
    check({
        'sortof([' + Q + 'bx' + Q + ', ' + Q + 'az' + Q + ', ' + Q + 'cy' + Q + '], lastchar)':
            '["bx", "cy", "az"]',
    })


def test_sortof_key_must_be_a_math_or_yap():
    result, error = ev('chore boxed(n) ong\nyeet [n]\nbet\nsortof([1, 2], boxed)')
    assert result is None
    assert 'sort key must be a math or a yap' in error.details


def test_sortof_rejects_mixed_key_types():
    source = ('chore mixed(n) ong\nfr n == 1 ong\nyeet 1\nbet\nyeet ' + Q + 'a' + Q + '\nbet\n'
              'sortof([1, 2], mixed)')
    result, error = ev(source)
    assert result is None
    assert 'all maths or all yaps' in error.details


def test_a_closure_can_be_passed_in():
    source = ('chore times(k) ong\nchore go(n) ong\nyeet n * k\nbet\nyeet go\nbet\n'
              'eachof([1, 2, 3], times(10))')
    result, error = ev(source)
    assert error is None
    assert repr(result) == '[10, 20, 30]'


def test_the_pile_is_not_mutated():
    result, error = ev('stash xs = [3, 1]\neachof(xs, dbl)\nsortof(xs)\nxs')
    assert error is None
    assert repr(result) == '[3, 1]'


def test_an_error_inside_the_chore_propagates():
    result, error = ev('eachof([1], howmany)')
    assert result is None
    assert "'howmany' needs a yap, pile or bag" in error.details


def test_wrong_arity_is_reported():
    result, error = ev('smoosh([1, 2], dbl)')
    assert result is None
    assert "'dbl' takes 1 argument(s), got 2" in error.details


def test_passing_something_that_is_not_a_chore():
    result, error = ev('eachof([1], 5)')
    assert result is None
    assert 'is not a chore' in error.details


def test_first_argument_must_be_a_pile():
    for source in ('eachof(5, dbl)', 'keepif(5, odd)', 'smoosh(5, add)'):
        result, error = ev(source)
        assert result is None, source
        assert 'needs a pile' in error.details, source


def test_an_error_inside_a_chore_is_catchable():
    source = ('sus ong\neachof([1], howmany)\nwhoops e ong\n' + Q + 'caught' + Q + '\nbet')
    result, error = ev(source)
    assert error is None
    assert result.value == 'caught'


# --- postfix chaining ---

def test_calling_a_chore_stored_in_a_bag():
    source = ('chore f() ong\nyeet 7\nbet\nstash d = {}\n'
              'd[' + Q + 'go' + Q + '] = f\nd[' + Q + 'go' + Q + ']()')
    result, error = ev(source, prelude=False)
    assert error is None
    assert repr(result) == '7'


def test_calling_a_chore_stored_in_a_pile():
    source = 'chore g() ong\nyeet 9\nbet\nstash fs = [0]\nfs[0] = g\nfs[0]()'
    result, error = ev(source, prelude=False)
    assert error is None
    assert repr(result) == '9'


def test_calling_the_chore_a_chore_returned():
    source = 'chore mk() ong\nchore inner() ong\nyeet 3\nbet\nyeet inner\nbet\nmk()()'
    result, error = ev(source, prelude=False)
    assert error is None
    assert repr(result) == '3'


def test_indexing_what_a_call_returned():
    source = 'chore f() ong\nyeet [1, 2]\nbet\nf()[1]'
    result, error = ev(source, prelude=False)
    assert error is None
    assert repr(result) == '2'


def test_a_bag_of_chores_behaves_like_an_object():
    source = (
        'chore counter() ong\n'
        'stash n = 0\n'
        'chore bump() ong\nn += 1\nyeet n\nbet\n'
        'chore peek() ong\nyeet n\nbet\n'
        'yeet {' + Q + 'bump' + Q + ': bump, ' + Q + 'peek' + Q + ': peek}\n'
        'bet\n'
        'stash a = counter()\nstash b = counter()\n'
        'a[' + Q + 'bump' + Q + ']()\na[' + Q + 'bump' + Q + ']()\nb[' + Q + 'bump' + Q + ']()\n'
        '[a[' + Q + 'peek' + Q + '](), b[' + Q + 'peek' + Q + ']()]'
    )
    result, error = ev(source, prelude=False)
    assert error is None
    assert repr(result) == '[2, 1]'
# Copyright (c) 2026 iam-kira (Vijay Biradar)
# Licensed under the MIT License. See LICENSE for the full text.

import aura

Q = '"'


def ev(source):
    result, error = aura.run('<stdin>', source, aura.new_symbol_table())
    if isinstance(result, list):
        result = result[-1] if result else None
    return result, error


def cook(text):
    """Wrap text in aura yap quotes."""
    return Q + text + Q


def test_a_name_in_a_hole():
    result, error = ev('stash n = 5\n' + cook('n is {n}'))
    assert error is None
    assert result.value == 'n is 5'


def test_any_expression_in_a_hole():
    for source, expected in ((cook('{1 + 2}'), '3'), (cook('{smol(4, 2)}'), '2')):
        result, error = ev(source)
        assert error is None, source
        assert result.value == expected, source


def test_several_holes_and_surrounding_text():
    result, error = ev(cook('a{1}b{2}c'))
    assert error is None
    assert result.value == 'a1b2c'


def test_adjacent_holes():
    result, error = ev('stash a = 1\nstash b = 2\n' + cook('{a}{b}'))
    assert error is None
    assert result.value == '12'


def test_non_yap_values_are_shown_as_they_repr():
    result, error = ev('stash xs = [1, 2]\n' + cook('{xs}'))
    assert error is None
    assert result.value == '[1, 2]'


def test_a_yap_inside_a_hole_keeps_no_quotes():
    result, error = ev('stash s = ' + cook('hi') + '\n' + cook('say {s}'))
    assert error is None
    assert result.value == 'say hi'


def test_a_yap_literal_inside_a_hole():
    result, error = ev(cook('{' + cook('inner') + '}'))
    assert error is None
    assert result.value == 'inner'


def test_a_bag_lookup_inside_a_hole():
    result, error = ev('stash d = {' + cook('a') + ': 1}\n' + cook('{d[' + cook('a') + ']}'))
    assert error is None
    assert result.value == '1'


def test_a_call_inside_a_hole():
    result, error = ev('chore f(n) ong\nyeet n * 2\nbet\n' + cook('doubled {f(4)}'))
    assert error is None
    assert result.value == 'doubled 8'


def test_doubled_braces_are_literal():
    result, error = ev(cook('literal {{brace}}'))
    assert error is None
    assert result.value == 'literal {brace}'


def test_a_yap_without_holes_is_untouched():
    result, error = ev(cook('no holes'))
    assert error is None
    assert result.value == 'no holes'


def test_escapes_still_work_alongside_holes():
    result, error = ev(cook('tab' + chr(92) + 'there {1}'))
    assert error is None
    assert result.value == 'tab\there 1'


def test_an_interpolated_yap_is_still_a_yap():
    result, error = ev('howmany(' + cook('{1}{2}') + ')')
    assert error is None
    assert repr(result) == '2'

    result, error = ev(cook('{1} {2}') + '[0]')
    assert error is None
    assert result.value == '1'


def test_an_empty_hole_is_rejected():
    result, error = ev(cook('{ }'))
    assert result is None
    assert 'Empty {} in a yap' in error.details


def test_a_broken_expression_in_a_hole_is_a_syntax_error():
    result, error = ev(cook('{1 +}'))
    assert result is None
    assert error.error_name == 'Invalid Syntax'


def test_two_statements_in_one_hole_are_rejected():
    result, error = ev(cook('{1; 2}'))
    assert result is None
    assert 'exactly one expression' in error.details


def test_an_unclosed_hole_reports_and_asks_for_more():
    result, error = ev(cook('unclosed {1')[:-1])
    assert result is None
    assert 'unterminated' in error.details
    assert aura.wants_more('<stdin>', Q + 'a {1')


def test_a_runtime_error_inside_a_hole_propagates():
    result, error = ev(cook('{1 / 0}'))
    assert result is None
    assert 'Division by zero' in error.details


def test_a_hole_error_is_catchable():
    result, error = ev('sus ong\n' + cook('{mystery}') + '\nwhoops e ong\ne[' + cook('why') + ']\nbet')
    assert error is None
    assert "'mystery' is not defined" in result.value
# Copyright (c) 2026 iam-kira (Vijay Biradar)
# Licensed under the MIT License. See LICENSE for the full text.

import aura


def reset_symbols():
    aura.global_symbol_table.symbols.clear()


def test_interpreter_arithmetic_evaluation():
    reset_symbols()
    result, error = aura.run('<stdin>', '1 + 2 * 3')

    assert error is None
    assert repr(result) == '7'


def test_interpreter_var_declare_assign_and_access():
    reset_symbols()
    result, error = aura.run('<stdin>', 'stash x = 10\nx = x + 5\nx')

    assert error is None
    assert isinstance(result, list)
    assert [repr(value) for value in result] == ['10', '15', '15']


def test_interpreter_comparison_result():
    reset_symbols()
    result, error = aura.run('<stdin>', '5 + 1 >= 3')

    assert error is None
    assert repr(result) == '1'


def test_interpreter_undefined_variable_error():
    reset_symbols()
    result, error = aura.run('<stdin>', 'y')

    assert result is None
    assert isinstance(error, aura.RTError)
    assert 'not defined' in error.as_string()


def test_interpreter_division_by_zero_error():
    reset_symbols()
    result, error = aura.run('<stdin>', '1 / 0')

    assert result is None
    assert isinstance(error, aura.RTError)
    assert 'Division by zero' in error.as_string()


def test_run_uses_supplied_symbol_table_and_leaves_global_alone():
    reset_symbols()
    table = aura.SymbolTable()
    result, error = aura.run('<stdin>', 'stash z = 99', table)

    assert error is None
    assert repr(result) == '99'
    assert table.exists('z')
    assert not aura.global_symbol_table.exists('z')


def test_interpreter_if_takes_true_branch():
    reset_symbols()
    result, error = aura.run('<stdin>', 'stash x = 0\nfr 1 < 2 ong\n  x = 10\nbet\nx')

    assert error is None
    assert [repr(value) for value in result] == ['0', '10', '10']


def test_interpreter_if_elif_else_chain():
    reset_symbols()
    src = 'stash x = 5\nfr x > 10 ong\n  1\norfr x > 3 ong\n  2\nwhatever\n  3\nbet'
    result, error = aura.run('<stdin>', src)

    assert error is None
    assert [repr(value) for value in result] == ['5', '2']


def test_interpreter_if_without_else_yields_zero():
    reset_symbols()
    result, error = aura.run('<stdin>', 'fr 0 ong\n  1\nbet')

    assert error is None
    assert repr(result) == '0'


def test_interpreter_while_counts_up():
    reset_symbols()
    result, error = aura.run('<stdin>', 'stash i = 0\nkeep i < 5 ong\n  i = i + 1\nbet\ni')

    assert error is None
    assert [repr(value) for value in result] == ['0', '5', '5']


def test_interpreter_while_body_never_runs():
    reset_symbols()
    result, error = aura.run('<stdin>', 'stash i = 9\nkeep i < 5 ong\n  i = i + 1\nbet')

    assert error is None
    assert [repr(value) for value in result] == ['9', '0']


def test_interpreter_while_with_nested_if():
    reset_symbols()
    src = 'stash i = 0\nstash big = 0\nkeep i < 6 ong\n  fr i > 2 ong\n    big = big + 1\n  bet\n  i = i + 1\nbet\nbig'
    result, error = aura.run('<stdin>', src)

    assert error is None
    assert repr(result[-1]) == '3'


def test_interpreter_function_call_returns_last_value():
    reset_symbols()
    result, error = aura.run('<stdin>', 'chore add(a, b) ong\n  a + b\nbet\nadd(2, 3)')

    assert error is None
    assert repr(result[-1]) == '5'


def test_interpreter_function_sees_globals_but_args_shadow():
    reset_symbols()
    src = 'stash k = 100\nchore bump(k) ong\n  k + 1\nbet\nbump(1)\nk'
    result, error = aura.run('<stdin>', src)

    assert error is None
    assert [repr(value) for value in result[-2:]] == ['2', '100']


def test_interpreter_function_with_loop_body():
    reset_symbols()
    src = 'chore sum_to(n) ong\n  stash i = 0\n  stash total = 0\n  keep i < n ong\n    total = total + i\n    i = i + 1\n  bet\n  total\nbet\nsum_to(5)'
    result, error = aura.run('<stdin>', src)

    assert error is None
    assert repr(result[-1]) == '10'


def test_interpreter_zero_arg_function():
    reset_symbols()
    result, error = aura.run('<stdin>', 'chore two() ong\n  2\nbet\ntwo() * 3')

    assert error is None
    assert repr(result[-1]) == '6'
# Copyright (c) 2026 iam-kira (Vijay Biradar)
# Licensed under the MIT License. See LICENSE for the full text.

import aura


def token_types(tokens):
    return [token.type for token in tokens]


def test_lexer_basic_tokens_and_eof():
    lexer = aura.Lexer('<stdin>', '1 + 2')
    tokens, error = lexer.make_tokens()

    assert error is None
    assert token_types(tokens) == [aura.TT_INT, aura.TT_PLUS, aura.TT_INT, aura.TT_EOF]


def test_lexer_identifiers_keywords_and_ops():
    lexer = aura.Lexer('<stdin>', 'stash x = 10 >= 2')
    tokens, error = lexer.make_tokens()

    assert error is None
    assert token_types(tokens) == [
        aura.TT_KEYWORD,
        aura.TT_IDENTIFIER,
        aura.TT_EQ,
        aura.TT_INT,
        aura.TT_GTE,
        aura.TT_INT,
        aura.TT_EOF,
    ]


def test_lexer_newline_tokenization():
    lexer = aura.Lexer('<stdin>', '1\n2')
    tokens, error = lexer.make_tokens()

    assert error is None
    assert token_types(tokens) == [
        aura.TT_INT,
        aura.TT_NEWLINE,
        aura.TT_INT,
        aura.TT_EOF,
    ]


def test_lexer_illegal_char_error():
    lexer = aura.Lexer('<stdin>', '1 $ 2')
    tokens, error = lexer.make_tokens()

    assert tokens == []
    assert isinstance(error, aura.IllegalCharError)


def test_lexer_skips_comments_but_keeps_newline():
    lexer = aura.Lexer('<stdin>', '1 # a comment\n2')
    tokens, error = lexer.make_tokens()

    assert error is None
    assert token_types(tokens) == ['INT', 'NEWLINE', 'INT', 'EOF']


def test_lexer_comment_only_source():
    lexer = aura.Lexer('<stdin>', '# nothing but a comment')
    tokens, error = lexer.make_tokens()

    assert error is None
    assert token_types(tokens) == ['EOF']
# Copyright (c) 2026 iam-kira (Vijay Biradar)
# Licensed under the MIT License. See LICENSE for the full text.

import aura

Q = '"'


def ev(source):
    """Run source in a fresh scope, returning (last value, error)."""
    result, error = aura.run('<stdin>', source, aura.new_symbol_table())
    if isinstance(result, list):
        result = result[-1] if result else None
    return result, error


def test_boolean_and_null_literals():
    for source, expected in (('based', '1'), ('cringe', '0'), ('ghosted', 'ghosted')):
        result, error = ev(source)
        assert error is None
        assert repr(result) == expected


def test_not_operator():
    for source, expected in (('nah based', '0'), ('nah cringe', '1'), ('nah 5', '0'), ('nah 0', '1')):
        result, error = ev(source)
        assert error is None
        assert repr(result) == expected


def test_and_or_truth_table():
    cases = {
        '1 also 1': '1', '1 also 0': '0', '0 also 1': '0', '0 also 0': '0',
        '1 orelse 1': '1', '1 orelse 0': '1', '0 orelse 1': '1', '0 orelse 0': '0',
    }
    for source, expected in cases.items():
        result, error = ev(source)
        assert error is None, source
        assert repr(result) == expected, source


def test_logic_precedence_below_comparison():
    result, error = ev('1 < 2 also 3 > 2')
    assert error is None
    assert repr(result) == '1'


def test_and_binds_tighter_than_or():
    result, error = ev('cringe also cringe orelse based')
    assert error is None
    assert repr(result) == '1'


def test_not_is_right_associative():
    result, error = ev('nah nah 5')
    assert error is None
    assert repr(result) == '1'


def test_exact_int_division_stays_int():
    result, error = ev('4 / 2')
    assert error is None
    assert isinstance(result.value, int)
    assert repr(result) == '2'


def test_inexact_division_is_float():
    result, error = ev('5 / 2')
    assert error is None
    assert repr(result) == '2.5'


def test_illegal_operation_on_function():
    result, error = ev('chore f() ong 1 bet\nf + 1')
    assert result is None
    assert error.error_name == 'Runtime Error'
    assert 'Illegal operation' in error.details


def test_function_compares_unequal_to_number():
    result, error = ev('chore f() ong 1 bet\nf == 1')
    assert error is None
    assert repr(result) == '0'


def test_also_short_circuits():
    """The right side must not run when the left already decides it."""
    result, error = ev('cringe also (1 / 0)')
    assert error is None
    assert repr(result) == '0'


def test_orelse_short_circuits():
    result, error = ev('based orelse (1 / 0)')
    assert error is None
    assert repr(result) == '1'


def test_also_still_evaluates_the_right_when_it_matters():
    result, error = ev('based also (1 / 0)')
    assert result is None
    assert 'Division by zero' in error.details


def test_short_circuit_guards_an_index():
    result, error = ev('stash xs = []\n0 < howmany(xs) also xs[0] == 1')
    assert error is None
    assert repr(result) == '0'

    result, error = ev('stash xs = [1]\n0 < howmany(xs) also xs[0] == 1')
    assert error is None
    assert repr(result) == '1'


def test_logic_operators_always_give_back_1_or_0():
    for source, expected in (('5 also 3', '1'), (Q + 'a' + Q + ' orelse 0', '1'),
                             ('[] orelse []', '0')):
        result, error = ev(source)
        assert error is None, source
        assert repr(result) == expected, source
"""The package metadata has to stay shippable.

A broken pyproject only shows up at release time, which is the worst moment to
find out.

Copyright (c) 2026 iam-kira (Vijay Biradar)
Licensed under the MIT License. See LICENSE for the full text.
"""

import os
import re

import aura

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

try:                                  # 3.11+
    import tomllib
except ModuleNotFoundError:           # pragma: no cover - older interpreters
    tomllib = None

import pytest


def config():
    if tomllib is None:
        pytest.skip('tomllib needs Python 3.11+')
    with open(os.path.join(REPO, 'pyproject.toml'), 'rb') as handle:
        return tomllib.load(handle)


def test_pyproject_parses():
    assert config()['project']['name'] == 'auralang'


def test_the_command_points_at_something_real():
    target = config()['project']['scripts']['aura']
    module, _, attribute = target.partition(':')

    assert module == 'aura'
    assert callable(getattr(aura, attribute)), '%s is not callable' % target


def test_the_shipped_module_is_the_only_one():
    """Shipping a second top-level module would squat a global name."""
    assert config()['tool']['setuptools']['py-modules'] == ['aura']


def test_no_runtime_dependencies():
    """The pitch is 'nothing to install'; keep it true."""
    assert config()['project']['dependencies'] == []


def test_the_version_comes_from_the_module():
    """The banner and the release must never disagree about the version."""
    project = config()['project']

    assert 'version' not in project, 'version should be dynamic, read from aura'
    assert project['dynamic'] == ['version']

    source = config()['tool']['setuptools']['dynamic']['version']
    assert source == {'attr': 'aura.__version__'}
    assert re.fullmatch(r'\d+\.\d+\.\d+', aura.__version__)


def test_the_declared_python_floor_matches_the_classifiers():
    project = config()['project']
    floor = project['requires-python']
    assert floor.startswith('>=3.')

    lowest = floor.split('>=')[1]
    assert any(c.endswith(lowest) for c in project['classifiers']), \
        'no classifier for the minimum Python %s' % lowest


def test_the_licence_is_an_spdx_expression_not_a_licence_body():
    """PyPI rejects a whole licence text in the License field with a 400.

    `license = { file = "LICENSE" }` inlines the entire file into the
    metadata; under Metadata-Version 2.4 that is invalid and the upload fails
    with an unexplained Bad Request. It has to be a short SPDX expression.
    """
    licence = config()['project']['license']

    assert isinstance(licence, str), 'license must be an SPDX string, not a table'
    assert '\n' not in licence, 'license looks like a licence body, not an expression'
    assert len(licence) < 40, 'license looks like a licence body, not an expression'
    assert licence == 'MIT'


def test_the_licence_file_is_shipped_and_exists():
    assert config()['project']['license-files'] == ['LICENSE']
    assert os.path.exists(os.path.join(REPO, 'LICENSE'))


def test_no_licence_classifier_alongside_the_expression():
    """PEP 639 replaces the classifier; carrying both is rejected."""
    classifiers = config()['project']['classifiers']
    assert not [c for c in classifiers if c.startswith('License ::')], \
        'drop the License :: classifier when using a license expression'


def test_the_readme_referenced_is_the_real_one():
    assert config()['project']['readme'] == 'README.md'
    assert os.path.exists(os.path.join(REPO, 'README.md'))


def test_shell_still_works_as_a_front_door():
    """python shell.py must keep working after the REPL moved into aura."""
    import shell

    assert shell.repl is aura.repl
    assert shell.main is aura.repl


def test_the_readme_has_no_relative_links():
    """PyPI renders the README with relative links resolved against pypi.org.

    `[CONTRIBUTING.md](CONTRIBUTING.md)` becomes
    pypi.org/project/auralang/CONTRIBUTING.md/ and 404s for every visitor.
    Absolute URLs behave identically on GitHub.
    """
    with open(os.path.join(REPO, 'README.md'), encoding='utf-8') as handle:
        readme = handle.read()

    relative = re.findall(r'\]\((?!https?://|#)([^)]+)\)', readme)
    assert not relative, 'relative links break on PyPI: %s' % relative


# --- credit on the command line ---

def test_version_flag_reports_version_and_author(capsys):
    assert aura.main(['--version']) == 0
    out = capsys.readouterr().out.strip()

    assert out == aura.BANNER
    assert aura.__version__ in out
    assert 'Vijay Biradar' in out


def test_short_version_flag(capsys):
    assert aura.main(['-V']) == 0
    assert 'Vijay Biradar' in capsys.readouterr().out


def test_help_credits_the_author_and_links_the_source(capsys):
    assert aura.main(['--help']) == 0
    out = capsys.readouterr().out

    assert 'aura by Vijay Biradar' in out
    assert 'github.com/iam-kira/what-did-i-do' in out
    assert '--version' in out


def test_the_author_facts_agree_with_the_packaging():
    assert aura.__author__ == config()['project']['authors'][0]['name']
    assert aura.__url__ == config()['project']['urls']['Source']
# Copyright (c) 2026 iam-kira (Vijay Biradar)
# Licensed under the MIT License. See LICENSE for the full text.

import aura


def parse_ast(text):
    lexer = aura.Lexer('<stdin>', text)
    tokens, error = lexer.make_tokens()
    assert error is None

    parser = aura.Parser(tokens)
    result = parser.parse()
    assert result.error is None
    return result.node


def first_statement_repr(text):
    ast = parse_ast(text)
    return repr(ast.element_nodes[0])


def test_parser_precedence_multiplication_before_addition():
    assert first_statement_repr('1 + 2 * 3') == '(INT:1, PLUS, (INT:2, MUL, INT:3))'


def test_parser_parentheses_override_precedence():
    assert first_statement_repr('(1 + 2) * 3') == '((INT:1, PLUS, INT:2), MUL, INT:3)'


def test_parser_var_declaration_and_assignment():
    declaration = first_statement_repr('stash x = 10')
    assignment = first_statement_repr('x = x + 1')

    assert declaration == '(stash IDENTIFIER:x = INT:10)'
    assert assignment == '(IDENTIFIER:x = (IDENTIFIER:x, PLUS, INT:1))'


def test_parser_comparison_expression():
    assert first_statement_repr('5 + 1 >= 3') == '((INT:5, PLUS, INT:1), GTE, INT:3)'


def test_parser_statement_list():
    ast = parse_ast('stash x = 10\nx = x + 2\nx')

    assert len(ast.element_nodes) == 3
"""The README promises Python 3.9+, and CI runs it there. Keep that honest.

Copyright (c) 2026 iam-kira (Vijay Biradar)
Licensed under the MIT License. See LICENSE for the full text.
"""

import ast
import glob
import os

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCES = ['aura.py', 'shell.py'] + sorted(
    os.path.relpath(path, REPO) for path in glob.glob(os.path.join(REPO, 'tests', '*.py'))
)


def test_every_source_file_parses_as_python_39():
    problems = []

    for name in SOURCES:
        path = os.path.join(REPO, name)
        with open(path, encoding='utf-8') as handle:
            source = handle.read()
        try:
            ast.parse(source, filename=name, feature_version=(3, 9))
        except SyntaxError as exc:
            problems.append(f'{name}:{exc.lineno}: {exc.msg}')

    assert not problems, '\n'.join(problems)


def test_no_runtime_dependencies_are_imported():
    """aura.py must run on a bare interpreter - stdlib only."""
    with open(os.path.join(REPO, 'aura.py'), encoding='utf-8') as handle:
        tree = ast.parse(handle.read())

    stdlib = {'sys', 'os', 'math', 'time', 'random'}
    imported = set()
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            imported.update(alias.name.split('.')[0] for alias in node.names)
        elif isinstance(node, ast.ImportFrom) and node.module:
            imported.add(node.module.split('.')[0])

    assert imported <= stdlib | {'shell'}, f'unexpected imports: {imported - stdlib}'
"""The REPL as a person actually meets it.

Copyright (c) 2026 iam-kira (Vijay Biradar)
Licensed under the MIT License. See LICENSE for the full text.
"""

CREDIT = 'aura by Vijay Biradar'


def said_goodbye(out):
    """The sign-off is picked at random, so assert the pool, not one phrase."""
    return any(bye in out for bye in aura.FAREWELLS)


import aura
import shell


def drive(typed, monkeypatch, capsys):
    """Feed lines to the REPL and return everything it printed."""
    lines = iter(typed)

    def fake_input(prompt=''):
        try:
            return next(lines)
        except StopIteration:
            raise EOFError

    monkeypatch.setattr('builtins.input', fake_input)
    aura.global_symbol_table.symbols.clear()
    shell.main()
    return capsys.readouterr().out


# --- the commands a newcomer reaches for ---

def test_help_lists_the_vocabulary(monkeypatch, capsys):
    out = drive(['help'], monkeypatch, capsys)
    for expected in ('stash', 'chore', 'cook(v)', 'sus ong', 'bet', 'docs/BOOK.md'):
        assert expected in out, expected


def test_help_explains_the_prompt_itself(monkeypatch, capsys):
    out = drive(['help'], monkeypatch, capsys)
    assert '...  >' in out
    assert 'ctrl-c' in out


def test_builtins_lists_every_builtin(monkeypatch, capsys):
    out = drive(['builtins'], monkeypatch, capsys)
    assert '%d built-in chores' % len(aura.BUILTINS) in out
    for name in ('cook', 'howmany', 'is_ghosted', 'swap', 'pair'):
        assert name in out, name


def test_a_defined_name_beats_the_shell_command(monkeypatch, capsys):
    out = drive(['stash help = 5', 'help'], monkeypatch, capsys)
    assert out.count('5') == 2
    assert 'regrettable keywords' not in out


def test_quit_words_all_leave(monkeypatch, capsys):
    for word in ('exit', 'quit', ':q'):
        out = drive([word, 'cook("never")'], monkeypatch, capsys)
        assert said_goodbye(out)
        assert 'never' not in out


# --- editing behaviour ---

def test_a_block_keeps_prompting_until_it_closes(monkeypatch, capsys):
    out = drive(['chore sq(n) ong', 'yeet n * n', 'bet', 'sq(9)'], monkeypatch, capsys)
    assert '<chore sq>' in out
    assert '81' in out


def test_a_blank_line_ends_a_stuck_block(monkeypatch, capsys):
    out = drive(['fr 1 ong', '', '2'], monkeypatch, capsys)
    assert "Expected 'bet'" in out
    assert '2' in out


def test_values_echo_with_repr_so_types_are_visible(monkeypatch, capsys):
    out = drive(['1', '"1"', 'ghosted', '[1]'], monkeypatch, capsys)
    assert '1\n' in out
    assert '"1"' in out
    assert 'ghosted' in out
    assert '[1]' in out


def test_state_persists_between_lines(monkeypatch, capsys):
    out = drive(['stash n = 1', 'n += 1', 'n'], monkeypatch, capsys)
    printed = [line for line in out.splitlines()
               if line and line not in ('aight imma head out', CREDIT)
               and line not in aura.FAREWELLS
               and not line.startswith(('aura ', "type 'help'"))]
    assert printed == ['1', '2', '2']


# --- the author is credited where people actually look ---

def test_the_repl_greets_you_with_version_and_author(monkeypatch, capsys):
    out = drive([], monkeypatch, capsys)
    assert aura.BANNER in out
    assert aura.__version__ in out
    assert 'Vijay Biradar' in out
    assert "type 'help'" in out


def test_the_farewell_credits_the_author(monkeypatch, capsys):
    out = drive(['exit'], monkeypatch, capsys)
    lines = out.strip().splitlines()

    assert lines[-2] in aura.FAREWELLS
    assert lines[-1] == 'aura by Vijay Biradar'


def test_every_way_out_credits_the_author(monkeypatch, capsys):
    for typed in (['exit'], ['quit'], [':q'], []):
        out = drive(typed, monkeypatch, capsys)
        assert said_goodbye(out), typed
        assert 'Vijay Biradar' in out, typed


def test_an_error_does_not_end_the_session(monkeypatch, capsys):
    out = drive(['1 / 0', 'cook("still here")'], monkeypatch, capsys)
    assert 'Division by zero' in out
    assert 'still here' in out


def test_errors_show_the_offending_line(monkeypatch, capsys):
    out = drive(['stash x = 1 + $'], monkeypatch, capsys)
    assert 'Illegal Character' in out
    assert 'stash x = 1 + $' in out
    assert '^' in out


def test_a_missing_bracket_call_is_explained(monkeypatch, capsys):
    out = drive(['cook "hi"'], monkeypatch, capsys)
    assert 'put the arguments in brackets' in out


def test_blank_lines_are_ignored(monkeypatch, capsys):
    out = drive(['', '   ', '7'], monkeypatch, capsys)
    assert '7' in out


def test_ctrl_c_drops_the_buffer_without_quitting(monkeypatch, capsys):
    """KeyboardInterrupt mid-block throws the block away, not the session."""
    lines = iter(['chore f() ong', KeyboardInterrupt, '42'])

    def fake_input(prompt=''):
        try:
            item = next(lines)
        except StopIteration:
            raise EOFError
        if item is KeyboardInterrupt:
            raise KeyboardInterrupt
        return item

    monkeypatch.setattr('builtins.input', fake_input)
    aura.global_symbol_table.symbols.clear()
    shell.main()
    out = capsys.readouterr().out

    assert 'Dropped that' in out
    assert '42' in out
    assert said_goodbye(out)


def test_eof_says_goodbye(monkeypatch, capsys):
    out = drive([], monkeypatch, capsys)
    assert said_goodbye(out)


# --- the send-off animation ---

class FakeTerminal:
    """Stands in for a real terminal, so the animation actually runs."""

    def __init__(self, tty=True):
        self.tty = tty
        self.written = []

    def isatty(self):
        return self.tty

    def write(self, text):
        self.written.append(text)

    def flush(self):
        pass

    def text(self):
        return ''.join(self.written)


def test_the_walk_off_animates_on_a_terminal(monkeypatch):
    monkeypatch.delenv('AURA_NO_MOTION', raising=False)
    monkeypatch.setattr(aura, 'WALK_DELAY', 0)

    screen = FakeTerminal()
    assert aura.walk_off(screen) is True

    drawn = screen.text()
    assert drawn.count(chr(13)) == aura.WALK_FRAMES + 2, 'a redraw per frame, then the wipe'
    assert 'o/' in drawn and chr(92) + 'o' in drawn, 'the arm should alternate'
    assert drawn.endswith(chr(13)), 'it should clear the line on the way out'


def test_the_walk_off_is_ascii_only(monkeypatch):
    """Windows consoles choke on anything else."""
    monkeypatch.delenv('AURA_NO_MOTION', raising=False)
    monkeypatch.setattr(aura, 'WALK_DELAY', 0)

    screen = FakeTerminal()
    aura.walk_off(screen)
    screen.text().encode('ascii')


def test_the_walk_off_is_skipped_when_output_is_not_a_terminal(monkeypatch):
    """Otherwise carriage returns end up in pipes, files and CI logs."""
    monkeypatch.delenv('AURA_NO_MOTION', raising=False)

    screen = FakeTerminal(tty=False)
    assert aura.walk_off(screen) is False
    assert screen.text() == ''


def test_aura_no_motion_switches_it_off(monkeypatch):
    monkeypatch.setenv('AURA_NO_MOTION', '1')

    screen = FakeTerminal()
    assert aura.walk_off(screen) is False
    assert screen.text() == ''


def test_the_farewell_pool_is_all_lowercase_ascii():
    for bye in aura.FAREWELLS:
        bye.encode('ascii')
        assert bye == bye.lower(), bye
        assert bye.strip() == bye


def test_the_pool_includes_auras_own_words():
    """Half the joke is that the shell says goodbye in its own vocabulary."""
    assert 'ghosted' in aura.FAREWELLS
    for word in ('ghosted', 'based', 'bounce', 'yeet'):
        assert any(word in bye for bye in aura.FAREWELLS), word


def test_farewell_always_carries_the_credit():
    for _ in range(30):
        text = aura.farewell()
        first, _, second = text.partition('\n')
        assert first in aura.FAREWELLS
        assert second == CREDIT


def test_the_sign_off_actually_varies():
    seen = {aura.farewell().split('\n')[0] for _ in range(200)}
    assert len(seen) > 1, 'the sign-off should not always be the same'
    assert seen <= set(aura.FAREWELLS)
"""Nothing should ever escape as a Python exception.

Every failure mode in aura is a returned error with a position. If a Python
traceback reaches the user, that is a bug in the interpreter, not their program.

Copyright (c) 2026 iam-kira (Vijay Biradar)
Licensed under the MIT License. See LICENSE for the full text.
"""

import itertools
import random

import pytest

import aura

AWKWARD = [
    '', ' ', '\n\n', '#', '#only comment', ';;;', '()', '(', ')', '[', ']', '{', '}',
    '{}', '{,}', '[,]', '{:}', '{1:}', '{:1}', '"', '""', '"\\"', '"{"', '"}"', '"{{"',
    '1..', '.1', '1.2.3', '- ', '+', '*', '/', '%', '^', '**', '=', '==', '===',
    'stash', 'stash =', 'stash x', 'stash x =', 'x =', '= 1',
    'fr', 'fr ong', 'fr ong bet', 'fr 1 ong bet', 'whatever', 'orfr', 'bet',
    'keep', 'keep ong bet', 'grind', 'grind ong', 'grind x', 'grind x =',
    'grind x among', 'grind x among [] ong bet', 'chore', 'chore f', 'chore f(',
    'chore f() ong', 'chore f() ong bet', 'chore f(,) ong bet',
    'yeet', 'bail', 'skip', 'oops', 'sus', 'sus ong bet', 'whoops',
    'summon', 'summon()', 'summon("")',
    'yap', 'cook(', 'cook()', 'cook(,)', 'cook(1,)',
    '[][0]', '""[0]', '{}["a"]', '[1][1.5]', '[1]["a"]', '{}[[]]', '{}[{}]',
    '1[0]', '1()', 'based', 'cringe', 'ghosted', 'nah', 'also', 'orelse',
    'based also', 'nah nah nah 1',
    '1 / 0', '1 % 0', '0 ^ -1', '2 ^ 10000', '(0-8) ^ (1/3)',
    'howmany()', 'howmany(1,2)', 'smol()', 'chunk()', 'chunk([1], "a")',
    'sortof()', 'sortof([1], 1)', 'eachof()', 'eachof([1])', 'smoosh([])',
    'mathify("")', 'mathify(" ")', 'mathify("nan")',
    'yapify()', 'stuff([])', 'yoink([])', 'yoink([], 0)', 'glue(1)', 'shred(1)',
    'stash a, b = []', 'stash a, = [1]', 'a, b = 1', ', = 1',
    'grind a, b among {} ong bet', 'grind a, b among "ab" ong bet',
    '"{}"', '"{;}"', '"{1;2}"', '"{[}"',
    'x' * 500, '(' * 300 + '1' + ')' * 300, '[' * 100 + ']' * 100,
    '1 ' + '+ 1 ' * 500,
    'chore f() ong\nyeet f()\nbet\nf()',
    'keep based ong\nbail\nbet',
    'grind i = 0 til 1000000 ong\nbail\nbet',
]

PIECES = ['stash', 'x', '=', '1', '+', '(', ')', '[', ']', '{', '}', ':', ',',
          'fr', 'ong', 'bet', 'chore', 'yeet', 'grind', 'among', 'keep',
          '"a"', '"{x}"', 'yap', 'sus', 'whoops', 'oops', 'nah', 'also', '.', '$']


def run_quietly(source):
    """Run and return nothing; the point is that it must not raise."""
    aura.run('<robustness>', source, aura.new_symbol_table())


@pytest.mark.parametrize('source', AWKWARD, ids=range(len(AWKWARD)))
def test_awkward_input_returns_an_error_instead_of_raising(source):
    run_quietly(source)


def test_random_token_soup_never_raises():
    random.seed(1234)
    for _ in range(2000):
        pieces = [random.choice(PIECES) for _ in range(random.randint(1, 7))]
        run_quietly(' '.join(pieces))


def test_every_ordered_pair_of_tokens_never_raises():
    for first, second in itertools.product(PIECES, repeat=2):
        run_quietly(first + ' ' + second)


def test_runaway_recursion_reports_rather_than_blowing_the_python_stack():
    _, error = aura.run('<robustness>', 'chore f() ong\nyeet f()\nbet\nf()', aura.new_symbol_table())
    assert error is not None
    assert 'Maximum call depth' in error.details


def test_deeply_nested_expressions_survive():
    source = '(' * 400 + '1' + ')' * 400
    result, error = aura.run('<robustness>', source, aura.new_symbol_table())
    assert error is None
    assert repr(result) == '1'
# Copyright (c) 2026 iam-kira (Vijay Biradar)
# Licensed under the MIT License. See LICENSE for the full text.

import aura


def ev(source):
    result, error = aura.run('<stdin>', source, aura.new_symbol_table())
    if isinstance(result, list):
        result = result[-1] if result else None
    return result, error


def test_scoping_is_lexical_not_dynamic():
    """A function must not see its caller's locals."""
    source = (
        'chore show() ong\nyeet secret\nbet\n'
        'chore caller() ong\nstash secret = 1\nyeet show()\nbet\n'
        'caller()'
    )
    result, error = ev(source)
    assert result is None
    assert "'secret' is not defined" in error.details


def test_assignment_mutates_the_outer_variable():
    source = 'stash count = 0\nchore bump() ong\ncount = count + 1\nbet\nbump()\nbump()\ncount'
    result, error = ev(source)
    assert error is None
    assert repr(result) == '2'


def test_var_inside_a_function_stays_local():
    source = 'stash x = 1\nchore f() ong\nstash x = 99\nbet\nf()\nx'
    result, error = ev(source)
    assert error is None
    assert repr(result) == '1'


def test_parameters_shadow_outer_names_without_clobbering_them():
    source = 'stash x = 1\nchore f(x) ong\nx = 50\nyeet x\nbet\nf(9)\nx'
    result, error = ev(source)
    assert error is None
    assert repr(result) == '1'


def test_closure_captures_its_defining_scope():
    source = (
        'chore adder(k) ong\nchore add(x) ong\nyeet x + k\nbet\nyeet add\nbet\n'
        'stash add5 = adder(5)\nadd5(3)'
    )
    result, error = ev(source)
    assert error is None
    assert repr(result) == '8'


def test_closures_have_independent_state():
    source = (
        'chore counter() ong\nstash n = 0\nchore tick() ong\nn = n + 1\nyeet n\nbet\nyeet tick\nbet\n'
        'stash a = counter()\nstash b = counter()\na()\na()\nb()'
    )
    result, error = ev(source)
    assert error is None
    assert repr(result) == '1'


def test_closure_keeps_counting_across_calls():
    source = (
        'chore counter() ong\nstash n = 0\nchore tick() ong\nn = n + 1\nyeet n\nbet\nyeet tick\nbet\n'
        'stash a = counter()\na()\na()\na()'
    )
    result, error = ev(source)
    assert error is None
    assert repr(result) == '3'


def test_assigning_an_undeclared_name_is_still_an_error():
    result, error = ev('chore f() ong\nnope = 1\nbet\nf()')
    assert result is None
    assert 'Cannot assign to undefined variable' in error.details


def test_recursion_still_resolves_the_functions_own_name():
    source = 'chore fact(n) ong\nfr n <= 1 ong\nyeet 1\nbet\nyeet n * fact(n - 1)\nbet\nfact(6)'
    result, error = ev(source)
    assert error is None
    assert repr(result) == '720'
# Copyright (c) 2026 iam-kira (Vijay Biradar)
# Licensed under the MIT License. See LICENSE for the full text.

import aura

Q = '"'


def ev(source):
    result, error = aura.run('<stdin>', source, aura.new_symbol_table())
    if isinstance(result, list):
        result = result[-1] if result else None
    return result, error


def check(cases):
    for source, expected in cases.items():
        result, error = ev(source)
        assert error is None, (source, error.details if error else None)
        assert repr(result) == expected, source


# --- maths ---

def test_smol_and_chonk_take_loose_args_or_a_pile():
    check({
        'smol(3, 1, 2)': '1',
        'smol([3, 1, 2])': '1',
        'chonk(3, 1, 2)': '3',
        'chonk([4, 9, 2])': '9',
        'smol(5)': '5',
    })


def test_total_absolutely_and_roundish():
    check({
        'total([1, 2, 3])': '6',
        'total(1, 2)': '3',
        'absolutely(-7)': '7',
        'absolutely(7)': '7',
        'roundish(3.7)': '4',
        'roundish(3.14159, 2)': '3.14',
    })


def test_empty_pile_has_no_smallest():
    result, error = ev('smol([])')
    assert result is None
    assert 'at least one math' in error.details


def test_maths_only():
    result, error = ev('smol(' + Q + 'a' + Q + ', 1)')
    assert result is None
    assert "'smol' needs a math, got yap" in error.details


# --- piles and yaps ---

def test_chunk_slices_both_kinds():
    check({
        'chunk([1, 2, 3, 4], 1, 3)': '[2, 3]',
        'chunk([1, 2, 3], 1)': '[2, 3]',
        'chunk(' + Q + 'hello' + Q + ', 1)': '"ello"',
        'chunk(' + Q + 'hello' + Q + ', -2)': '"lo"',
        'chunk(' + Q + 'hello' + Q + ', 0, 2)': '"he"',
    })


def test_chunk_clamps_instead_of_exploding():
    check({'chunk([1, 2], 0, 99)': '[1, 2]', 'chunk([1, 2], -99, 1)': '[1]'})


def test_flip_reverses_both_kinds():
    check({'flip([1, 2, 3])': '[3, 2, 1]', 'flip(' + Q + 'abc' + Q + ')': '"cba"'})


def test_glue_and_shred_round_trip():
    check({
        'glue([' + Q + 'a' + Q + ', ' + Q + 'b' + Q + '], ' + Q + '-' + Q + ')': '"a-b"',
        'glue([1, 2])': '"12"',
        'shred(' + Q + 'a,b' + Q + ', ' + Q + ',' + Q + ')': '["a", "b"]',
        'shred(' + Q + 'one two' + Q + ')': '["one", "two"]',
        'shred(' + Q + 'abc' + Q + ', ' + Q + Q + ')': '["a", "b", "c"]',
    })


def test_yap_case_and_trim():
    check({
        'shout(' + Q + 'hi' + Q + ')': '"HI"',
        'whisper(' + Q + 'HI' + Q + ')': '"hi"',
        'trim(' + Q + '  x  ' + Q + ')': '"x"',
    })


def test_where_and_gotit():
    check({
        'where([1, 2, 3], 2)': '1',
        'where([1, 2, 3], 9)': '-1',
        'where(' + Q + 'hello' + Q + ', ' + Q + 'l' + Q + ')': '2',
        'gotit([1, 2], 2)': '1',
        'gotit([1, 2], 9)': '0',
        'gotit(' + Q + 'hello' + Q + ', ' + Q + 'e' + Q + ')': '1',
    })


def test_sortof_does_not_touch_the_original():
    check({
        'sortof([3, 1, 2])': '[1, 2, 3]',
        'sortof([' + Q + 'b' + Q + ', ' + Q + 'a' + Q + '])': '["a", "b"]',
        'sortof([])': '[]',
    })

    result, error = ev('stash xs = [3, 1]\nsortof(xs)\nxs')
    assert error is None
    assert repr(result) == '[3, 1]'


def test_sortof_refuses_a_mixed_pile():
    result, error = ev('sortof([1, ' + Q + 'a' + Q + '])')
    assert result is None
    assert 'all maths or all yaps' in error.details


def test_whatis_reports_dialect_type_names():
    check({
        'whatis(1)': '"math"',
        'whatis(' + Q + 'x' + Q + ')': '"yap"',
        'whatis([])': '"pile"',
        'whatis(cook)': '"chore"',
    })


# --- arity ---

def test_optional_arguments_may_be_omitted():
    result, error = ev('roundish(2.4)')
    assert error is None
    assert repr(result) == '2'


def test_roundish_rounds_half_away_from_zero():
    check({
        'roundish(2.5)': '3',
        'roundish(3.5)': '4',
        'roundish(-2.5)': '-3',
        'roundish(0.5)': '1',
        'roundish(7)': '7',
    })


def test_mathify_refuses_values_the_language_cannot_write():
    for text in ('nan', 'inf', '-inf'):
        result, error = ev('mathify(' + Q + text + Q + ')')
        assert result is None, text
        assert 'Cannot convert' in error.details, text


def test_mathify_accepts_exponent_notation():
    check({'mathify(' + Q + '1e3' + Q + ')': '1000'})


def test_variadic_builtin_accepts_any_count():
    check({'chonk(1, 2, 3, 4, 5)': '5'})


def test_too_few_arguments_is_reported_with_a_range():
    result, error = ev('chunk()')
    assert result is None
    assert 'takes 1 to 3 argument(s), got 0' in error.details


def test_variadic_arity_message_says_at_least():
    result, error = ev('smol()')
    assert result is None
    assert 'takes at least 1 argument(s), got 0' in error.details


def test_beg_works_without_a_prompt(monkeypatch):
    monkeypatch.setattr('builtins.input', lambda *a: 'typed')
    result, error = ev('beg()')
    assert error is None
    assert result.value == 'typed'


def test_beg_still_accepts_a_prompt(capsys, monkeypatch):
    monkeypatch.setattr('builtins.input', lambda prompt='': 'x')
    result, error = ev('beg(' + Q + 'name? ' + Q + ')')
    assert error is None
    assert result.value == 'x'
# Copyright (c) 2026 iam-kira (Vijay Biradar)
# Licensed under the MIT License. See LICENSE for the full text.

import os

import aura

Q = '"'


def write(tmp_path, name, source):
    target = tmp_path / name
    target.write_text(source, encoding='utf-8')
    return str(target)


# --- summon ---

def test_summon_brings_in_chores_and_stashes(tmp_path):
    write(tmp_path, 'lib.aura', 'chore double(n) ong\nyeet n * 2\nbet\nstash NAME = "lib"\n')
    main = write(tmp_path, 'main.aura', 'summon("lib.aura")\ncook(NAME)\ncook(double(21))\n')

    result, error = aura.run(main, open(main, encoding='utf-8').read(), aura.new_symbol_table())
    assert error is None


def test_summon_resolves_relative_to_the_summoning_file(tmp_path, capsys):
    sub = tmp_path / 'pkg'
    sub.mkdir()
    (sub / 'lib.aura').write_text('stash FROM_SUB = 1\n', encoding='utf-8')
    main = write(tmp_path, 'main.aura', 'summon("pkg/lib.aura")\ncook(FROM_SUB)\n')

    assert aura.main([main]) == 0
    assert capsys.readouterr().out == '1\n'


def test_summon_of_a_missing_file_is_a_runtime_error(tmp_path):
    main = write(tmp_path, 'main.aura', 'summon("nope.aura")\n')
    result, error = aura.run(main, open(main, encoding='utf-8').read(), aura.new_symbol_table())

    assert result is None
    assert 'Cannot summon' in error.details


def test_summon_reports_a_cycle_instead_of_recursing(tmp_path):
    main = write(tmp_path, 'loop.aura', 'summon("loop.aura")\n')
    result, error = aura.run(main, open(main, encoding='utf-8').read(), aura.new_symbol_table())

    assert result is None
    assert 'summoning itself' in error.details


def test_an_error_inside_a_summoned_file_points_at_that_file(tmp_path):
    write(tmp_path, 'bad.aura', 'stash x = 1 / 0\n')
    main = write(tmp_path, 'main.aura', 'summon("bad.aura")\n')
    result, error = aura.run(main, open(main, encoding='utf-8').read(), aura.new_symbol_table())

    assert result is None
    assert 'Division by zero' in error.details
    assert 'bad.aura' in error.as_string()


def test_summon_needs_a_yap(tmp_path):
    main = write(tmp_path, 'main.aura', 'summon(5)\n')
    result, error = aura.run(main, open(main, encoding='utf-8').read(), aura.new_symbol_table())

    assert result is None
    assert "'summon' needs a yap" in error.details


# --- CLI ---

def test_help_flag(capsys):
    assert aura.main(['--help']) == 0
    assert 'usage:' in capsys.readouterr().out


def test_tokens_flag_prints_the_stream(tmp_path, capsys):
    program = write(tmp_path, 'p.aura', 'stash x = 1\n')
    assert aura.main(['--tokens', program]) == 0

    out = capsys.readouterr().out.split()
    assert out[:4] == ['KEYWORD:stash', 'IDENTIFIER:x', 'EQ', 'INT:1']
    assert out[-1] == 'EOF'


def test_ast_flag_prints_one_line_per_statement(tmp_path, capsys):
    program = write(tmp_path, 'p.aura', 'stash x = 1\nx + 2\n')
    assert aura.main(['--ast', program]) == 0

    lines = capsys.readouterr().out.strip().splitlines()
    assert len(lines) == 2
    assert lines[0] == '(stash IDENTIFIER:x = INT:1)'


def test_dump_flags_report_errors_without_running(tmp_path, capsys):
    program = write(tmp_path, 'p.aura', 'stash x = $\n')
    assert aura.main(['--tokens', program]) == 1
    assert 'Illegal Character' in capsys.readouterr().out


def test_ast_flag_reports_a_syntax_error(tmp_path, capsys):
    program = write(tmp_path, 'p.aura', 'fr 1\n2\nbet\n')
    assert aura.main(['--ast', program]) == 1
    assert 'Invalid Syntax' in capsys.readouterr().out


def test_unknown_flag_exits_two(capsys):
    assert aura.main(['--nope', 'x.aura']) == 2
    assert 'unknown option' in capsys.readouterr().out


def test_no_file_is_an_error(capsys):
    assert aura.main(['--ast']) == 2
    assert 'expected a file' in capsys.readouterr().out


def test_extra_arguments_are_handed_to_the_program(tmp_path, capsys):
    program = write(tmp_path, 'p.aura', 'cook(handed())\n')
    assert aura.main([program, 'one', 'two']) == 0
    assert capsys.readouterr().out == '["one", "two"]\n'


def test_a_program_with_no_extra_arguments_gets_an_empty_pile(tmp_path, capsys):
    program = write(tmp_path, 'p.aura', 'cook(howmany(handed()))\n')
    assert aura.main([program]) == 0
    assert capsys.readouterr().out == '0\n'


# --- token positions ---

def test_token_without_positions_still_has_the_attributes():
    token = aura.Token(aura.TT_EOF)
    assert token.pos_start is None
    assert token.pos_end is None


# --- REPL continuation ---

def test_wants_more_on_an_unfinished_block():
    for source in ('chore f() ong', 'fr 1 ong', 'keep 1 ong', 'grind i = 0 til 2 ong'):
        assert aura.wants_more('<stdin>', source), source


def test_wants_more_on_an_unfinished_expression():
    for source in ('1 +', '[1,', '{' + Q + 'a' + Q + ': 1', '(1 + 2'):
        assert aura.wants_more('<stdin>', source), source


def test_wants_more_on_an_unterminated_yap():
    assert aura.wants_more('<stdin>', Q + 'oops')


def test_complete_input_does_not_want_more():
    for source in ('1 + 2', 'chore f() ong yeet 1 bet', 'stash x = [1, 2]'):
        assert not aura.wants_more('<stdin>', source), source


def test_a_real_error_does_not_want_more():
    for source in ('1 $ 2', 'stash 1 = 2'):
        assert not aura.wants_more('<stdin>', source), source
# Copyright (c) 2026 iam-kira (Vijay Biradar)
# Licensed under the MIT License. See LICENSE for the full text.

import aura

Q = '"'


def ev(source):
    result, error = aura.run('<stdin>', source, aura.new_symbol_table())
    if isinstance(result, list):
        result = result[-1] if result else None
    return result, error


def test_a_runtime_error_is_caught():
    result, error = ev('sus ong\n1 / 0\nwhoops e ong\n"caught"\nbet')
    assert error is None
    assert result.value == 'caught'


def test_the_body_value_survives_when_nothing_goes_wrong():
    result, error = ev('sus ong\n41 + 1\nwhoops e ong\n0\nbet')
    assert error is None
    assert repr(result) == '42'


def test_the_whoops_bag_carries_why_kind_file_and_line():
    result, error = ev('sus ong\n\n1 / 0\nwhoops e ong\ne\nbet')
    assert error is None
    assert repr(result) == (
        '{"why": "Division by zero", "kind": "math", "file": "<stdin>", "line": 3}'
    )


def test_oops_raises_a_yap():
    result, error = ev('oops ' + Q + 'nope' + Q)
    assert result is None
    assert error.details == 'nope'


def test_oops_can_raise_anything():
    result, error = ev('oops 42')
    assert result is None
    assert error.details == '42'


def test_oops_is_catchable():
    result, error = ev('sus ong\noops ' + Q + 'boom' + Q + '\nwhoops e ong\ne[' + Q + 'why' + Q + ']\nbet')
    assert error is None
    assert result.value == 'boom'


def test_catching_inside_a_chore_and_returning_from_the_whoops():
    source = ('chore safe(a, b) ong\nsus ong\nyeet a / b\nwhoops e ong\nyeet -1\nbet\nbet\n'
              'safe(10, 0)')
    result, error = ev(source)
    assert error is None
    assert repr(result) == '-1'


def test_returning_from_the_risky_body_still_works():
    source = 'chore safe(a, b) ong\nsus ong\nyeet a / b\nwhoops e ong\nyeet -1\nbet\nbet\nsafe(10, 2)'
    result, error = ev(source)
    assert error is None
    assert repr(result) == '5'


def test_bail_inside_a_risky_still_breaks_the_loop():
    source = ('stash n = 0\ngrind i = 0 til 5 ong\nsus ong\nfr i == 2 ong\nbail\nbet\n'
              'n += 1\nwhoops e ong\n0\nbet\nbet\nn')
    result, error = ev(source)
    assert error is None
    assert repr(result) == '2'


def test_errors_in_the_whoops_are_not_caught_by_it():
    result, error = ev('sus ong\n1 / 0\nwhoops e ong\nnope_at_all\nbet')
    assert result is None
    assert "'nope_at_all' is not defined" in error.details


def test_nested_risky_catches_at_the_inner_level():
    source = ('sus ong\nsus ong\n1 / 0\nwhoops inner ong\noops ' + Q + 'rethrown' + Q + '\nbet\n'
              'whoops outer ong\nouter[' + Q + 'why' + Q + ']\nbet')
    result, error = ev(source)
    assert error is None
    assert result.value == 'rethrown'


def test_a_caught_program_keeps_going():
    source = 'sus ong\n1 / 0\nwhoops e ong\n0\nbet\n7'
    result, error = ev(source)
    assert error is None
    assert repr(result) == '7'


def test_missing_whoops_is_a_syntax_error():
    result, error = ev('sus ong\n1\nbet')
    assert result is None
    assert "Expected 'whoops'" in error.details


def test_whoops_needs_a_name():
    result, error = ev('sus ong\n1\nwhoops ong\n2\nbet')
    assert result is None
    assert 'Expected a name for the whoops' in error.details


def test_undefined_name_is_catchable():
    result, error = ev('sus ong\nmystery\nwhoops e ong\ne[' + Q + 'why' + Q + ']\nbet')
    assert error is None
    assert "'mystery' is not defined" in result.value


def test_runaway_recursion_is_catchable():
    source = ('chore boom(n) ong\nyeet boom(n + 1)\nbet\n'
              'sus ong\nboom(0)\nwhoops e ong\n' + Q + 'stopped' + Q + '\nbet')
    result, error = ev(source)
    assert error is None
    assert result.value == 'stopped'
"""The text and pairing builtins, including the edges that bite.

Copyright (c) 2026 iam-kira (Vijay Biradar)
Licensed under the MIT License. See LICENSE for the full text.
"""

import aura

Q = '"'


def ev(source):
    result, error = aura.run('<stdin>', source, aura.new_symbol_table())
    if isinstance(result, list):
        result = result[-1] if result else None
    return result, error


def check(cases):
    for source, expected in cases.items():
        result, error = ev(source)
        assert error is None, (source, error.details if error else None)
        assert repr(result) == expected, (source, repr(result), expected)


def yap(text):
    return Q + text + Q


# --- where / gotit: substrings on yaps, elements on piles ---

def test_where_finds_a_substring():
    check({
        'where(' + yap('hello') + ', ' + yap('ll') + ')': '2',
        'where(' + yap('hello world') + ', ' + yap('o w') + ')': '4',
        'where(' + yap('hello') + ', ' + yap('h') + ')': '0',
        'where(' + yap('hello') + ', ' + yap('zz') + ')': '-1',
    })


def test_an_empty_needle_is_found_at_the_start():
    """Matches every other language: "".find("") is 0."""
    check({'where(' + yap('abc') + ', ' + yap('') + ')': '0'})


def test_a_needle_longer_than_the_haystack():
    check({'where(' + yap('ab') + ', ' + yap('abcdef') + ')': '-1'})


def test_gotit_finds_a_substring():
    check({
        'gotit(' + yap('hello world') + ', ' + yap('lo w') + ')': '1',
        'gotit(' + yap('hello') + ', ' + yap('zz') + ')': '0',
    })


def test_searching_a_yap_needs_a_yap():
    result, error = ev('where(' + yap('abc') + ', 1)')
    assert result is None
    assert error.kind == 'type'
    assert 'needs a yap to look for' in error.details


def test_piles_still_search_by_element():
    check({
        'where([1, 2, 3], 2)': '1',
        'where([[1], [2]], [2])': '1',
        'gotit([1, 2], 9)': '0',
    })


def test_bags_still_search_by_label():
    check({'gotit({' + yap('a') + ': 1}, ' + yap('a') + ')': '1'})


def test_gotit_reports_the_real_error_not_its_own():
    result, error = ev('gotit(1, 2)')
    assert result is None
    assert 'needs a yap, pile or bag' in error.details


# --- swap ---

def test_swap_replaces_every_occurrence():
    check({
        'swap(' + yap('a-b-c') + ', ' + yap('-') + ', ' + yap('+') + ')': '"a+b+c"',
        'swap(' + yap('aaa') + ', ' + yap('aa') + ', ' + yap('b') + ')': '"ba"',
        'swap(' + yap('abc') + ', ' + yap('z') + ', ' + yap('!') + ')': '"abc"',
    })


def test_swap_can_delete():
    check({'swap(' + yap('a b c') + ', ' + yap(' ') + ', ' + yap('') + ')': '"abc"'})


def test_swap_refuses_an_empty_needle():
    """Otherwise it would splice between every character."""
    result, error = ev('swap(' + yap('abc') + ', ' + yap('') + ', ' + yap('x') + ')')
    assert result is None
    assert 'empty yap' in error.details


def test_swap_needs_yaps():
    result, error = ev('swap(1, ' + yap('a') + ', ' + yap('b') + ')')
    assert result is None
    assert error.kind == 'type'


# --- starts / ends ---

def test_starts_and_ends():
    check({
        'starts(' + yap('hello') + ', ' + yap('he') + ')': '1',
        'starts(' + yap('hello') + ', ' + yap('lo') + ')': '0',
        'ends(' + yap('hello') + ', ' + yap('lo') + ')': '1',
        'ends(' + yap('hello') + ', ' + yap('he') + ')': '0',
    })


def test_everything_starts_and_ends_with_nothing():
    check({
        'starts(' + yap('abc') + ', ' + yap('') + ')': '1',
        'ends(' + yap('abc') + ', ' + yap('') + ')': '1',
    })


def test_a_yap_starts_and_ends_with_itself():
    check({
        'starts(' + yap('abc') + ', ' + yap('abc') + ')': '1',
        'ends(' + yap('abc') + ', ' + yap('abc') + ')': '1',
    })


# --- code / letter ---

def test_code_and_letter_round_trip():
    check({
        'code(' + yap('A') + ')': '65',
        'letter(65)': '"A"',
        'letter(code(' + yap('z') + '))': '"z"',
        'code(' + yap(' ') + ')': '32',
    })


def test_code_needs_exactly_one_character():
    for source in ('code(' + yap('ab') + ')', 'code(' + yap('') + ')'):
        result, error = ev(source)
        assert result is None, source
        assert 'exactly one character' in error.details


def test_letter_rejects_impossible_numbers():
    for source in ('letter(0 - 1)', 'letter(9999999)'):
        result, error = ev(source)
        assert result is None, source
        assert 'not a character' in error.details


def test_letter_handles_non_ascii():
    result, error = ev('code(letter(233))')
    assert error is None
    assert repr(result) == '233'


def test_code_and_letter_enable_a_caesar_shift():
    source = (
        'chore shift(text, step) ong\n'
        'stash out = ""\n'
        'grind c among text ong\n'
        'out += letter(code(c) + step)\n'
        'bet\n'
        'yeet out\n'
        'bet\n'
        'shift(shift(' + yap('abc') + ', 1), 0 - 1)'
    )
    result, error = ev(source)
    assert error is None
    assert result.value == 'abc'


# --- numbered / pair ---

def test_numbered_indexes_a_pile():
    check({
        'numbered([' + yap('a') + ', ' + yap('b') + '])': '[[0, "a"], [1, "b"]]',
        'numbered([])': '[]',
    })


def test_numbered_works_on_a_yap():
    check({'numbered(' + yap('ab') + ')': '[[0, "a"], [1, "b"]]'})


def test_numbered_feeds_a_two_name_grind():
    source = ('stash out = []\ngrind i, x among numbered([' + yap('a') + ', ' + yap('b') + ']) ong\n'
              'out = stuff(out, "{i}{x}")\nbet\nout')
    result, error = ev(source)
    assert error is None
    assert repr(result) == '["0a", "1b"]'


def test_pair_zips_two_piles():
    check({
        'pair([1, 2], [' + yap('a') + ', ' + yap('b') + '])': '[[1, "a"], [2, "b"]]',
        'pair([], [1])': '[]',
    })


def test_pair_stops_at_the_shorter_pile():
    check({
        'pair([1, 2, 3], [' + yap('a') + '])': '[[1, "a"]]',
        'pair([1], [' + yap('a') + ', ' + yap('b') + '])': '[[1, "a"]]',
    })


def test_pair_needs_two_piles():
    result, error = ev('pair([1], ' + yap('ab') + ')')
    assert result is None
    assert error.kind == 'type'
    assert 'needs a pile' in error.details


def test_numbered_and_pair_copy_their_input():
    result, error = ev('stash xs = [[1]]\nstash n = numbered(xs)\nn[0][1][0] = 9\nxs')
    assert error is None
    assert repr(result) == '[[1]]'


# --- the brace escape, which a JSON-shaped program needs ---

def test_a_literal_brace_can_be_written():
    for source, expected in (('"{{"', '"{"'), ('"}}"', '"}"'), (Q + chr(92) + '{' + Q, '"{"')):
        result, error = ev(source)
        assert error is None, source
        assert repr(result) == expected, source


def test_the_brace_error_says_how_to_fix_it():
    result, error = ev('"{"')
    assert result is None
    assert 'literal one' in error.details


# --- keywords cannot be names, and the error says so ---

def test_a_keyword_as_a_name_explains_itself():
    cases = {
        'chore shift(text, by) ong@yeet 1@bet': "'by' is a keyword",
        'stash keep = 1': "'keep' is a keyword",
        'chore bet() ong@1@bet': "'bet' is a keyword",
        'grind among = 1 til 2 ong@1@bet': "'among' is a keyword",
        'stash x, also = [1, 2]': "'also' is a keyword",
        'sus ong@1@whoops bet ong@1@bet': "'bet' is a keyword",
    }
    for source, expected in cases.items():
        result, error = ev(source.replace('@', chr(10)))
        assert result is None, source
        assert expected in error.details, (source, error.details)


def test_a_builtin_name_is_still_usable_as_a_variable():
    """Builtins live in a scope you can shadow; keywords you cannot."""
    result, error = ev('stash code = 5@code'.replace('@', chr(10)))
    assert error is None
    assert repr(result) == '5'
# Copyright (c) 2026 iam-kira (Vijay Biradar)
# Licensed under the MIT License. See LICENSE for the full text.

import aura

Q = '"'


def ev(source):
    result, error = aura.run('<stdin>', source, aura.new_symbol_table())
    if isinstance(result, list):
        result = result[-1] if result else None
    return result, error


# --- strings ---

def test_string_literal_and_escapes():
    result, error = ev(Q + 'a' + chr(92) + 'nb' + chr(92) + 't' + Q)
    assert error is None
    assert result.value == 'a\nb\t'


def test_string_concat_and_repeat():
    result, error = ev(Q + 'ab' + Q + ' + ' + Q + 'cd' + Q)
    assert error is None
    assert result.value == 'abcd'

    result, error = ev(Q + 'ab' + Q + ' * 3')
    assert error is None
    assert result.value == 'ababab'


def test_string_comparison_and_truthiness():
    result, error = ev(Q + 'a' + Q + ' < ' + Q + 'b' + Q)
    assert error is None
    assert repr(result) == '1'

    result, error = ev('nah ' + Q + Q)
    assert error is None
    assert repr(result) == '1'


def test_string_plus_number_is_illegal():
    result, error = ev(Q + 'a' + Q + ' + 1')
    assert result is None
    assert 'Illegal operation' in error.details


def test_unterminated_string_is_a_lex_error():
    result, error = ev(Q + 'oops')
    assert result is None
    assert 'unterminated string' in error.details


# --- lists ---

def test_list_literal_and_concat():
    result, error = ev('[1, 2] + [3]')
    assert error is None
    assert repr(result) == '[1, 2, 3]'


def test_list_equality_is_by_value():
    result, error = ev('[1, [2]] == [1, [2]]')
    assert error is None
    assert repr(result) == '1'


def test_empty_list_is_falsy():
    result, error = ev('nah []')
    assert error is None
    assert repr(result) == '1'


def test_list_literal_may_span_lines():
    result, error = ev('[\n1,\n2,\n]')
    assert error is None
    assert repr(result) == '[1, 2]'


# --- indexing ---

def test_index_list_and_string():
    result, error = ev('[10, 20, 30][1]')
    assert error is None
    assert repr(result) == '20'

    result, error = ev(Q + 'hello' + Q + '[1]')
    assert error is None
    assert result.value == 'e'


def test_negative_index_counts_from_the_end():
    result, error = ev('[1, 2, 3][-1]')
    assert error is None
    assert repr(result) == '3'


def test_chained_indexing():
    result, error = ev('[[1, 2], [3, 4]][1][0]')
    assert error is None
    assert repr(result) == '3'


def test_index_out_of_range():
    result, error = ev('[1, 2][9]')
    assert result is None
    assert 'out of range' in error.details


def test_non_integer_index():
    result, error = ev('[1, 2][1.5]')
    assert result is None
    assert 'must be a whole math' in error.details


def test_indexing_a_number_is_rejected():
    result, error = ev('stash n = 5\nn[0]')
    assert result is None
    assert 'not indexable' in error.details


# --- operators ---

def test_modulo():
    for source, expected in (('7 % 3', '1'), ('8 % 4', '0'), ('-7 % 3', '2')):
        result, error = ev(source)
        assert error is None, source
        assert repr(result) == expected, source


def test_modulo_by_zero():
    result, error = ev('1 % 0')
    assert result is None
    assert 'Modulo by zero' in error.details


def test_power_is_right_associative():
    result, error = ev('2 ^ 3 ^ 2')
    assert error is None
    assert repr(result) == '512'


def test_power_binds_tighter_than_unary_minus():
    result, error = ev('-2 ^ 2')
    assert error is None
    assert repr(result) == '-4'


# --- builtins ---

def test_len_of_string_and_list():
    result, error = ev('howmany(' + Q + 'abc' + Q + ')')
    assert error is None
    assert repr(result) == '3'

    result, error = ev('howmany([1, 2])')
    assert error is None
    assert repr(result) == '2'


def test_len_of_number_is_an_error():
    result, error = ev('howmany(5)')
    assert result is None
    assert 'needs a yap, pile or bag' in error.details


def test_str_and_num_round_trip():
    result, error = ev('mathify(yapify(42)) == 42')
    assert error is None
    assert repr(result) == '1'


def test_num_rejects_nonsense():
    result, error = ev('mathify(' + Q + 'nope' + Q + ')')
    assert result is None
    assert 'Cannot convert' in error.details


def test_append_and_pop_do_not_mutate_the_original():
    result, error = ev('stash a = [1, 2]\nstash b = stuff(a, 3)\na')
    assert error is None
    assert repr(result) == '[1, 2]'

    result, error = ev('yoink([1, 2, 3], 0)')
    assert error is None
    assert repr(result) == '[2, 3]'


def test_pop_index_is_bounds_checked():
    result, error = ev('yoink([1], 5)')
    assert result is None
    assert 'out of range' in error.details


def test_type_predicates():
    cases = {
        'is_math(1)': '1', 'is_math(' + Q + 'a' + Q + ')': '0',
        'is_yap(' + Q + 'a' + Q + ')': '1', 'is_pile([])': '1',
        'is_chore(cook)': '1', 'is_chore(1)': '0',
    }
    for source, expected in cases.items():
        result, error = ev(source)
        assert error is None, source
        assert repr(result) == expected, source


def test_builtin_arity_is_checked():
    result, error = ev('cook(1, 2)')
    assert result is None
    assert 'takes 1 argument(s), got 2' in error.details


def test_print_returns_zero(capsys):
    result, error = ev('cook(' + Q + 'hi' + Q + ')')
    assert error is None
    assert repr(result) == '0'
    assert capsys.readouterr().out == 'hi\n'


def test_builtins_are_available_but_shadowable():
    result, error = ev('stash howmany = 5\nhowmany')
    assert error is None
    assert repr(result) == '5'
